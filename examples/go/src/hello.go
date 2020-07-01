package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "Hello Go !")
    })

    println("\"Hello Go\" is running and listening on port 8080")
    http.ListenAndServe(":8080", nil)
}
