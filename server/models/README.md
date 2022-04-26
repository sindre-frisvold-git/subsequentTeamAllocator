# Add info about how allocation works

TBC

## Folder structure proposal

- The top level, _e.g server/models_, should contain the main allocation functions, _e.g. randomAllocation, geneticAllocation, etc._
  - These should be the only files called from outside the models folder, _e.g. in routes_
- The helper folder, e.g. _server/models/helper_, should include all code that is common to multiple allocation functions, _e.g. randomAllocation_
  - It might also include imperative logic for the allocation functions, _e.g. having cross over logic in /models/helper/genetic.js to make geneticAllocation more declarative_
