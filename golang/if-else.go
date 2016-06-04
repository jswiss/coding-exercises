package main

import "fmt"

func main() {

  i := 7
  j := 8

  if i%2 == 0 {
    // "+" is only used as a numeric operator, to combine vars and string use comma
    fmt.Println(i, "is even")
  } else {
    fmt.Println(i, "is odd")
  }

  if j%4 == 0 {
    fmt.Println(j, "is divisible by 4")
  }

  if num := 9; num < 0 {
        fmt.Println(num, "is negative")
    } else if num < 10 {
        fmt.Println(num, "has 1 digit")
    } else {
        fmt.Println(num, "has multiple digits")
    }
}