package config

import (
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"runtime"
	"strconv"

	"github.com/joho/godotenv"
	"github.com/sirupsen/logrus"
)

var (
	// Get current file full path from runtime
	_, b, _, _ = runtime.Caller(0)

	// Root folder of this project
	ProjectRootPath = filepath.Join(filepath.Dir(b), "../")
)

type AppConfig struct {
	SERVERPORT int
	DBPORT     int
	DBHOST     string
	DBUSER     string
	DBPASS     string
	DBNAME     string
}

// Load loads the environment variables from the .env file.
func Load(envFile string) {
	err := godotenv.Load(dir(envFile))
	if err != nil {
		panic(fmt.Errorf("Error loading .env file: %w", err))
	}
}

// dir returns the absolute path of the given environment file (envFile) in the Go module's
// root directory. It searches for the 'go.mod' file from the current working directory upwards
// and appends the envFile to the directory containing 'go.mod'.
// It panics if it fails to find the 'go.mod' file.
func dir(envFile string) string {
	currentDir, err := os.Getwd()
	if err != nil {
		panic(err)
	}

	for {
		goModPath := filepath.Join(currentDir, "go.mod")
		if _, err := os.Stat(goModPath); err == nil {
			break
		}

		parent := filepath.Dir(currentDir)
		if parent == currentDir {
			panic(fmt.Errorf("go.mod not found"))
		}
		currentDir = parent
	}

	return filepath.Join(currentDir, envFile)
}

func InitConfig() *AppConfig {
	var res = new(AppConfig)
	res = loadConfig(".env")
	if res == nil {
		logrus.Fatal("Config: Cannot start program, failed to load configuration")
		return nil
	}

	return res
}

func InitConfigTest() *AppConfig {
	var res = new(AppConfig)

	const projectDirName = "RESTful-API-testing"
	re := regexp.MustCompile(`^(.*` + projectDirName + `)`)
	cwd, _ := os.Getwd()
	rootPath := re.Find([]byte(cwd))
	
	res = loadConfig(string(rootPath) + "/.env.test")
	if res == nil {
		logrus.Fatal("Config: Cannot start program, failed to load configuration")
		return nil
	}

	return res
}

func loadConfig(envPath string) *AppConfig {
	var res = new(AppConfig)
	Load(envPath)
	
	if val, found := os.LookupEnv("SERVERPORT"); found {
		port, err := strconv.Atoi(val)
		if err != nil {
			logrus.Error("Config: Invalid port value,", err.Error())
			return nil
		}

		res.SERVERPORT = port
	}

	if val, found := os.LookupEnv("DBPORT"); found {
		port, err := strconv.Atoi(val)
		if err != nil {
			logrus.Error("Config: Invalid DB port value,", err.Error())
			return nil
		}

		res.DBPORT = port
	}

	if val,found := os.LookupEnv("DBHOST"); found {
		res.DBHOST = val
	}

	if val,found := os.LookupEnv("DBUSER"); found {
		res.DBUSER = val
	}

	if val,found := os.LookupEnv("DBPASS"); found {
		res.DBPASS = val
	}

	if val,found := os.LookupEnv("DBNAME"); found {
		res.DBNAME = val
	}

	return res
}
