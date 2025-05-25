import role from "./role-route.js";
import auth from "./auth-route.js";
import user from "./user-route.js";
import cinema from "./cinema-route.js";
import room from "./room-route.js";
import seat from "./seat-route.js";
import movie from "./movie-route.js";
import showtime from "./showtime-route.js";
import genre from "./genre-route.js";
import tickeType from "./ticket_type-route.js";
import booking from "./booking-route.js";
import pay from "./pay-route.js";

export const Routers = (app) => {
	app.use("/api/v1/role", role);
	app.use("/api/v1/auth", auth);
	app.use("/api/v1/user", user);
	app.use("/api/v1/cinema", cinema);
	app.use("/api/v1/room", room);
	app.use("/api/v1/seat", seat);
	app.use("/api/v1/movie", movie);
	app.use("/api/v1/showtime", showtime);
	app.use("/api/v1/genre", genre);
	app.use("/api/v1/ticket_type", tickeType);
	app.use("/api/v1/booking", booking);
	app.use("/api/v1/pay", pay);
};
