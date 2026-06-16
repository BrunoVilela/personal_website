# Example workflow for cleaning species occurrence records.
library(dplyr)

clean_occurrences <- function(records) {
  records |>
    filter(!is.na(decimalLongitude), !is.na(decimalLatitude)) |>
    distinct(species, decimalLongitude, decimalLatitude, .keep_all = TRUE)
}
