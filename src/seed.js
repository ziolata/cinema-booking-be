import mongoose from "mongoose";
import Movie from "./models/movie.js";
const uri = process.env.DB_URI;
console.log(uri);

mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverSelectionTimeoutMS: 30000, // tăng timeout lên 30s
});

await Movie.insertMany([
	{
		title: "Movie 1",
		duration: 120,
		description: "Desc 1",
		poster_url:
			"https://res.cloudinary.com/dzurbhizb/image/upload/v1744190709/MoviePoster/Movie_Spider%20Man:%20Back%20Go%20Home.jpg",
		release_date: new Date(),
		genre: [
			"67f5e7045d7b553bfd60c798",
			"6846ae9877266b37d9897a31",
			"6846aeaf77266b37d9897a34",
		],
	},
	{
		title: "Movie 2",
		duration: 150,
		description: "Desc 2",
		poster_url:
			"https://res.cloudinary.com/dzurbhizb/image/upload/v1744190709/MoviePoster/Movie_Spider%20Man:%20Back%20Go%20Home.jpg",
		release_date: new Date(),
		genre: ["6846aeaf77266b37d9897a34"],
	},
	{
		title: "Movie 3",
		duration: 120,
		description: "Desc 3",
		poster_url:
			"https://res.cloudinary.com/dzurbhizb/image/upload/v1744190709/MoviePoster/Movie_Spider%20Man:%20Back%20Go%20Home.jpg",
		release_date: new Date(),
		genre: ["6846ae9877266b37d9897a31"],
	},
	{
		title: "Movie 4",
		duration: 180,
		description: "Desc 4",
		poster_url:
			"https://res.cloudinary.com/dzurbhizb/image/upload/v1744190709/MoviePoster/Movie_Spider%20Man:%20Back%20Go%20Home.jpg",
		release_date: new Date(),
		genre: ["6846ae9877266b37d9897a31"],
	},
	{
		title: "Movie 5",
		duration: 180,
		description: "Desc 5",
		poster_url:
			"https://res.cloudinary.com/dzurbhizb/image/upload/v1744190709/MoviePoster/Movie_Spider%20Man:%20Back%20Go%20Home.jpg",
		release_date: new Date(),
		genre: ["6846ae9877266b37d9897a31", "67f5e7045d7b553bfd60c798"],
	},
	{
		title: "Movie 6",
		duration: 180,
		description: "Desc 6",
		poster_url:
			"https://res.cloudinary.com/dzurbhizb/image/upload/v1744190709/MoviePoster/Movie_Spider%20Man:%20Back%20Go%20Home.jpg",
		release_date: new Date(),
		genre: ["6846ae9877266b37d9897a31"],
	},
	{
		title: "Movie 7",
		duration: 180,
		description: "Desc 7",
		poster_url:
			"https://res.cloudinary.com/dzurbhizb/image/upload/v1744190709/MoviePoster/Movie_Spider%20Man:%20Back%20Go%20Home.jpg",
		release_date: new Date(),
		genre: ["6846ae9877266b37d9897a31"],
	},
	{
		title: "Movie 8",
		duration: 180,
		description: "Desc 8",
		poster_url:
			"https://res.cloudinary.com/dzurbhizb/image/upload/v1744190709/MoviePoster/Movie_Spider%20Man:%20Back%20Go%20Home.jpg",
		release_date: new Date(),
		genre: ["6846ae9877266b37d9897a31"],
	},
	{
		title: "Movie 9",
		duration: 180,
		description: "Desc 9",
		poster_url:
			"https://res.cloudinary.com/dzurbhizb/image/upload/v1744190709/MoviePoster/Movie_Spider%20Man:%20Back%20Go%20Home.jpg",
		release_date: new Date(),
		genre: ["6846ae9877266b37d9897a31"],
	},
	{
		title: "Movie 10",
		duration: 180,
		description: "Desc 10",
		poster_url:
			"https://res.cloudinary.com/dzurbhizb/image/upload/v1744190709/MoviePoster/Movie_Spider%20Man:%20Back%20Go%20Home.jpg",
		release_date: new Date(),
		genre: ["6846ae9877266b37d9897a31"],
	},
]);

console.log("Seeded successfully!");
process.exit();
