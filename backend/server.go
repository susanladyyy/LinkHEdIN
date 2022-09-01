package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	"github.com/go-pg/pg"
	"github.com/rs/cors"
	"github.com/susanladyyy/LinkHEdIN/graph"
	"github.com/susanladyyy/LinkHEdIN/graph/generated"
	"github.com/susanladyyy/LinkHEdIN/postgre"
)

const defaultPort = "8080"

func main() {
	db := postgre.New(&pg.Options{
		Addr:     ":5432",
		User:     "postgres",
		Password: "SU22-1",
		Database: "LinkHEdIn",
	})

	db.AddQueryHook(postgre.DBLogger{})

	port := os.Getenv("PORT")
	router := chi.NewRouter()

	router.Use(cors.New(cors.Options{
		AllowedOrigins:     []string{"http://127.0.0.1:5173", "http://localhost:5173"},
		AllowCredentials:   true,
		Debug:              true,
		AllowedMethods:     []string{"POST", "GET", "OPTIONS", "PUT"},
		AllowedHeaders:     []string{"*"},
		OptionsPassthrough: true,
	}).Handler)

	if port == "" {
		port = defaultPort
	}

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{
		DB: db,
	}}))

	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
