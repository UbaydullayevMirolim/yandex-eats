import { router as userRoute } from "./user.route";
import { router as adminRoute } from "./admin.route";
import { router as courierRoute } from "./courier.route";
import { router as dostavkaRoute } from "./dostavka.route";
import { router as foodRoute } from "./food.route";
import { router as orderRoute } from "./order.route";
import { router as restaurantRoute } from "./restaurant.route";
import { router as paymentRoute } from "./payments.rute";

export default [
  userRoute,
  adminRoute,
  courierRoute,
  dostavkaRoute,
  foodRoute,
  orderRoute,
  restaurantRoute,
  paymentRoute,
];
