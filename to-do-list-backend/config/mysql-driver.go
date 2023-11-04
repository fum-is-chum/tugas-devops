package config

import (
	"fmt"
	"to-do-list/model"

	"github.com/sirupsen/logrus"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitMyqlConn(config *AppConfig) *gorm.DB {
	var dsn = fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local", config.DBUSER, config.DBPASS, config.DBHOST, config.DBPORT, config.DBNAME)
	
	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		logrus.Error("Model : cannot connect to database, ", err.Error())
		return nil
	}

	return DB
}

func Migrate(db *gorm.DB) {
	db.AutoMigrate(&model.ActivityGroup{}, &model.TodoItem{})
}