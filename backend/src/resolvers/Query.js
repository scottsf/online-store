const { forwardTo } = require('prisma-binding');

const Query = {
  items: forwardTo('db'),
  // items(parent, args, ctx, info) {
  //   return ctx.db.prisma.items();
  // },
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    console.log('HI');
    // console.log(ctx.request.userId);
    if (!ctx.request.userId) {
      return null;
    }

    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
  },
};

module.exports = Query;
