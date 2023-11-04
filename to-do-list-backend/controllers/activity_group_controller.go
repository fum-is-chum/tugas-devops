package controller

import (
	"fmt"
	"net/http"
	"strconv"
	"to-do-list/dto"
	responseHelper "to-do-list/helpers/response"
	activityGroupUsecase "to-do-list/usecase/activity-group"

	"github.com/labstack/echo/v4"
)

type activityGroupController struct {
	useCase activityGroupUsecase.ActivityGroupUseCase
}

func NewActivityGroupController(useCase activityGroupUsecase.ActivityGroupUseCase) *activityGroupController {
	return &activityGroupController{useCase}
}

func (t *activityGroupController) GetActivityGroups(c echo.Context) error {
	groups, err := t.useCase.GetActivities()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, responseHelper.FailedResponse(fmt.Sprintf("Error: %s", err.Error())))
	}

	var response []dto.ActivityGroupResponse
	for _, value := range groups {
		response = append(response, dto.ActivityGroupResponse{
			Id:         value.ID,
			Title:      value.Title,
			CreatedAt:  value.CreatedAt,
			ModifiedAt: value.UpdatedAt,
		})
	}

	return c.JSON(http.StatusOK, responseHelper.SuccessWithDataResponse("Success get activity groups", response))
}

func (t *activityGroupController) GetActivity(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, responseHelper.FailedResponse("Bad request: Invalid Id"))
	}

	group, err := t.useCase.GetActivityById(uint(id))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, responseHelper.FailedResponse(fmt.Sprintf("Error: %s", err.Error())))
	}

	var todoResponse = []dto.ToDoResponse{}

	for _, value := range group.TodoItems {
		todoResponse = append(todoResponse, dto.ToDoResponse{
			Id:              value.ID,
			Title:           value.Title,
			IsActive:        value.IsActive,
			Priority:        value.Priority,
			ActivityGroupID: value.ActivityGroupID,
			CreatedAt:       value.CreatedAt,
			ModifiedAt:      value.UpdatedAt,
		})
	}

	return c.JSON(http.StatusOK, responseHelper.SuccessWithDataResponse(fmt.Sprintf("Success get activity group with id %d", id), dto.ActivityGroupResponse{
		Id:         group.ID,
		Title:      group.Title,
		TodoItems:  todoResponse,
		CreatedAt:  group.CreatedAt,
		ModifiedAt: group.UpdatedAt,
	}))
}

func (t *activityGroupController) CreateActivity(c echo.Context) error {
	var payload dto.ActivityGroupRequest

	if err := c.Bind(&payload); err != nil {
		return c.JSON(http.StatusBadRequest, responseHelper.FailedResponse(fmt.Sprintf("Error: %s", err.Error())))
	}

	if err := t.useCase.CreateActivity(&payload); err != nil {
		return c.JSON(http.StatusInternalServerError, responseHelper.FailedResponse(fmt.Sprintf("Error: %s", err.Error())))
	}

	return c.JSON(http.StatusOK, responseHelper.SuccessResponse("Success create activity"))
}

func (t *activityGroupController) UpdateActivity(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, responseHelper.FailedResponse("Bad request: Invalid Id"))
	}

	var payload dto.ActivityGroupRequest
	if err := c.Bind(&payload); err != nil {
		return c.JSON(http.StatusBadRequest, responseHelper.FailedResponse(fmt.Sprintf("Bad Request: %s", err.Error())))
	}

	if err := t.useCase.UpdateActivity(uint(id), &payload); err != nil {
		return c.JSON(http.StatusInternalServerError, responseHelper.FailedResponse(fmt.Sprintf("Error: %s", err.Error())))
	}

	return c.JSON(http.StatusOK, responseHelper.SuccessResponse("Success update activity"))
}

func (t *activityGroupController) DeleteActivity(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, responseHelper.FailedResponse("Bad request: Invalid Id"))
	}

	if err := t.useCase.DeleteActivity(uint(id)); err != nil {
		return c.JSON(http.StatusInternalServerError, responseHelper.FailedResponse(fmt.Sprintf("Error: %s", err.Error())))
	}

	return c.JSON(http.StatusOK, responseHelper.SuccessResponse("Success delete activity"))
}
