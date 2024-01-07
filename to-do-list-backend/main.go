package main

import (
	"fmt"
	"to-do-list/config"
	"to-do-list/routes"

	"github.com/labstack/echo/v4"
)


func main() {
	// load config
	var cfg = config.InitConfig()

	// open mysql connection
	dbMysql := config.InitMyqlConn(cfg)

	// migrate db
	config.Migrate(dbMysql)

	e := echo.New()
	// init routing
	routes.InitRouter(e, dbMysql)
	// start the server, and log if it fails
	e.Logger.Fatal(e.Start(fmt.Sprintf(":%d", cfg.SERVERPORT)))
}
