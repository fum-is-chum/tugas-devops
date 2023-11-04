package routes

import (
	controller "to-do-list/controllers"
	m "to-do-list/middlewares"
	activityRepo "to-do-list/repository/activity-group"
	todoRepo "to-do-list/repository/to-do-item"
	activityUseCase "to-do-list/usecase/activity-group"
	todoUseCase "to-do-list/usecase/to-do-item"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func InitRouter(e *echo.Echo, db *gorm.DB) {
	
	// logger middleware
	m.LoggerMiddleware(e)
	m.Cors(e)

	// activity group
	activityRepo := activityRepo.NewActivityGroupRepository(db)
	activityService := activityUseCase.NewActivityGroupUseCase(activityRepo)
	activityController := controller.NewActivityGroupController(activityService)
	
	activityGroup := e.Group("/activity-groups")
	activityGroup.GET("", activityController.GetActivityGroups)
	activityGroup.GET("/:id", activityController.GetActivity)
	activityGroup.POST("", activityController.CreateActivity)
	activityGroup.PATCH("/:id", activityController.UpdateActivity)
	activityGroup.DELETE("/:id", activityController.DeleteActivity)

	// todo item
	todoRepo := todoRepo.NewTodoItemRepository(db)
	todoService := todoUseCase.NewTodoItemUseCase(todoRepo)
	todoController := controller.NewTodoItemController(todoService)

	todoGroup := e.Group("/todo-items")
	todoGroup.GET("", todoController.GetTodos)
	todoGroup.GET("/:id", todoController.GetTodo)
	todoGroup.POST("", todoController.CreateTodo)
	todoGroup.PATCH("/:id", todoController.UpdateTodo)
	todoGroup.DELETE("/:id", todoController.DeleteTodo)
}
