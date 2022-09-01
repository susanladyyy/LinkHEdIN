package postgre

import (
	"fmt"

	"github.com/go-pg/pg"
)

type DBLogger struct{}

func (d DBLogger) BeforeQuery(q *pg.QueryEvent) {

}

func (d DBLogger) AfterQuery(q *pg.QueryEvent) {
	query, _ := q.FormattedQuery()
	fmt.Println(string(query))
}

func New(opts *pg.Options) *pg.DB {
	return pg.Connect(opts)
}
