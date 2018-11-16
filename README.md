# Code Evaluator
#### Unstable Alpha Version, Use at your own risk.
Reads, compiles, runs source code in supported languages, and gives you an output.

### Supported Languages
+ **python2** (python2)
+ **python3** (python3)
+ **C** (gcc)
+ **C++** (g++)

## How to Install
```npm install code-evaluator```

## How to Use
See example: [express-example.js](./examples/express-example.js "Example code to use code-evaluator in an Express application")

---
## Error Codes

| Error.name | Description |
|------------|-------------|
|CODEDIR_NOEXIST| Codefile storage directory does not exists.|
|CODEFILE_NOWRITE| Unable to write codefile.|
|INPUTDIR_NOEXIST| Inputfile storage directory does not exists.|
|INPUTFILE_NOWRITE| Unable to write inputfile.|
|COMPILATION_ERROR| Unable to compile from codefile|
|CODERUN_ERROR| Unable to run code or binary|
---
### License
[GPL 3.0](./LICENSE)