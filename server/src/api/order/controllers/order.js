"use strict";

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  //custom controller for the api you created
  async customOrderController(ctx) {
    try {
      const bodyData = ctx.body;

      const entries = await strapi.entityService.findMany(
        "api::product.product",
        {
          fields: ["title"],
          limit: 2,
        }
      );

      return { data: entries };
    } catch (err) {
      ctx.body = err;
    }
  },

  //now we will modify the create api(already made by strapi) when /orders is called from the frontend
  //as this is the controller for handling /api/orders [post] request
  //core controller updating

  async create(ctx) {
    try {
      const { products } = ctx.request.body;

      const lineItems = await Promise.all(
        products.map(async (product) => {
          const productEntities = await strapi.entityService.findMany(
            "api::product.product",
            {
              filters: {
                key: product.key,
              },
            }
          );
          const realProduct = productEntities[0];
          const image = product.image;
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: realProduct.title,
                images: [image],
              },
              unit_amount: realProduct.price * 100,
            },
            quantity: product.quantity,
          };
        })
      );

      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: ["US", "CA"] },
        payment_method_types: ["card"],
        mode: "payment",
        line_items: lineItems,
        success_url: `${process.env.CLIENT_BASE_URL}/payments/success`,
        cancel_url: `${process.env.CLIENT_BASE_URL}/payments/failed`,
      });

      await strapi.entityService.create("api::order.order", {
        data: {
          products,
          stripeId: session.id,
        },
      });

      return { stripeId: session.id };
    } catch (error) {
      console.log(error);
      ctx.response.status = 500;
      return error;
    }
  },
}));
