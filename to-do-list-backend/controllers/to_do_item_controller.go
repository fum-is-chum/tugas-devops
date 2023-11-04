package controller

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"
	"to-do-list/dto"
	responseHelper "to-do-list/helpers/response"
	todoUsecase "to-do-list/usecase/to-do-item"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type todoItemController struct {
	useCase todoUsecase.TodoItemUseCase
}

func NewTodoItemController(useCase todoUsecase.TodoItemUseCase) *todoItemController {
	return &todoItemController{useCase}
}

func (t *todoItemController) GetTodos(c echo.Context) error {
	// get activity_group_id
	activity_group_id, err := strconv.Atoi(c.QueryParam("activity_group_id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, responseHelper.FailedResponse(fmt.Sprintf("Error: %s", err.Error())))
	}

	todos, err := t.useCase.GetTodos(uint(activity_group_id))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, responseHelper.FailedResponse(fmt.Sprintf("Error: %s", err.Error())))
	}

	var response []dto.ToDoResponse
	for _, value := range todos {
		response = append(response, dto.ToDoResponse{
			Id:              value.ID,
			Title:           value.Title,
			IsActive:        value.IsActive,
			Priority:        value.Priority,
			ActivityGroupID: value.ActivityGroupID,
			CreatedAt:       value.CreatedAt,
			ModifiedAt:      value.UpdatedAt,
		})
	}

	return c.JSON(http.StatusOK, responseHelper.SuccessWithDataResponse("Sucess get todos", response))
}

func (t *todoItemController) GetTodo(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, responseHelper.FailedResponse("Bad Request: Id invalid"))
	}

	// your solution here
	todo, err := t.useCase.GetTodoById(uint(id))
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.JSON(http.StatusNotFound, responseHelper.FailedResponse("Todo not found"))
		}
		return c.JSON(http.StatusInternalServerError, responseHelper.FailedResponse(fmt.Sprintf("Error on fetching todo with id %d", id)))
	}

	return c.JSON(http.StatusOK, responseHelper.SuccessWithDataResponse(fmt.Sprintf("Sucess fetch todo with id %d", id), dto.ToDoResponse{
		Id:              todo.ID,
		Title:           todo.Title,
		IsActive:        todo.IsActive,
		Priority:        todo.Priority,
		ActivityGroupID: todo.ActivityGroupID,
		CreatedAt:       todo.CreatedAt,
		ModifiedAt:      todo.UpdatedAt,
	}))
}

func (t *todoItemController) CreateTodo(c echo.Context) error {
	var payload dto.ToDoRequest

	if err := c.Bind(&payload); err != nil {
		return c.JSON(http.StatusBadRequest, responseHelper.FailedResponse(fmt.Sprintf("Bad Request: %s", err.Error())))
	}

	if err := t.useCase.CreateTodo(&payload); err != nil {
		return c.JSON(http.StatusInternalServerError, responseHelper.FailedResponse(fmt.Sprintf("Error: %s", err.Error())))
	}

	return c.JSON(http.StatusCreated, responseHelper.SuccessResponse("Success create todo"))
}

func (t *todoItemController) UpdateTodo(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, responseHelper.FailedResponse("Bad request: Id invalid"))
	}

	var payload dto.ToDoRequest
	if err := c.Bind(&payload); err != nil {
		return c.JSON(http.StatusBadRequest, responseHelper.FailedResponse(fmt.Sprintf("Bad request: %s", err.Error())))
	}

	if err := t.useCase.UpdateTodo(uint(id), &payload); err != nil {
		return c.JSON(http.StatusInternalServerError, responseHelper.FailedResponse(fmt.Sprintf("Error: %s", err.Error())))
	}

	return c.JSON(http.StatusOK, responseHelper.SuccessResponse("Success update todo"))
}

func (t *todoItemController) DeleteTodo(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, responseHelper.FailedResponse("Bad request: Id invalid"))
	}

	if err := t.useCase.DeleteTodo(uint(id)); err != nil {
		return c.JSON(http.StatusInternalServerError, responseHelper.FailedResponse(fmt.Sprintf("Error: %s", err.Error())))
	}

	return c.JSON(http.StatusOK, responseHelper.SuccessResponse("Success delete todo"))
}
