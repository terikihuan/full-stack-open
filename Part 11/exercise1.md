# Steps of CI/CD process

## 1. Source control

There should be a mechanism to check the code before merging it with the main branch, i.e. a reviewer.

## 2. Build process (after commiting a change)

- Compile the code and its dependencies (e.g. packages, library)
- Run unit tests, and they must cover many aspects of our programs
- Check and enforce code coverage(?)

Thoughts:

- Having unit tests can give developers more confident when commit changes, any bugs and problems in the program will get caught by the tests.
  However, the tests must have high coverage in order to be effective.
- What is code coverage ? - Code coverage measures the percentage of source code that is tested. Ideally, we want code coverage to be 90%+

## 3. Run program in test environment

- Run integration tests

Thoughts:

- Somehow testing is performed across different stages

## 4. Run program in production environment (1 box [?])

- Rollback alarms (triggers after things like errors, high latency or key business metrics )
- Build confident (sometimes called 'bake period', 12~24h)
- Use detection systems like: anomaly detection
- Or alternatively, monitor the error counts, latency breaches
- "Canary"

Thoughts:

- 1 box represents a down-scaled version of the real production environment, maybe like 1 host instead of multiple hosts

## 5. Deploy in full production environment

- Same as step 4

# Open sources CI/CD tools for [Python]

- Jenkins
- Go CD
- Bazel
- Buildbot: automate the compile/test cycle to validate code changes
- Tox: automation tool providing packaging, testing, and deployment of Python
- Traviz: distributed CI server which builds tests for open source projects
- Teamcity
