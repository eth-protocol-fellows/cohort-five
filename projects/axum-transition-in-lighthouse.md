# Project Template

This project involves transitioning from the [`warp`](https://crates.io/crates/warp) crate to the [`axum`](https://crates.io/crates/axum) crate for `lighthouse` prior to the next fork.
The goal is to address existing technical debt, enhance performance, and improve code quality with better metrics and logging capabilities.

## Motivation

The current usage of the warp crate in `lighthouse` has been identified as a source of technical debt.
`lighthouse` contributors find the `warp` crate challenging to use because of its complex type system that often requires placing many items in the heap without needing to. Switching to `axum` is expected to boost performance and make the code easier to manage.

## Project description

- Transition from `warp` to `axum`, first for the beacon node apis.
- Improve the maintenance and quality of code

## Specification

`validator` endpoints should use `axum`.

In addition, the types and traits associated with the beacon APIs will be migrated to a new repository: [ethereum_apis/beacon-api-types](https://github.com/sigp/ethereum_apis/tree/main/beacon-api-types).
This modular approach facilitates cleaner and more maintainable code.

## Roadmap
- *By end of July* : implement the first endpoint using axum with integrated logging and metrics.
- *August* : continue migrating additional endpoints to axum.

## Possible challenges

- Time 

## Goal of the project

- Having all endpoints using `axum` instead of `warp` 
- Adding logging 
- Adding metrics to compare with the performance with current `warp` server 

## Collaborators

### Fellows 
 
-- 

### Mentors

[Pawan](https://github.com/pawanjay176)

## Resources

[Fork's where axum's transition has been started](https://github.com/pawanjay176/lighthouse/tree/axum)
[axum](https://crates.io/crates/axum)
[warp](https://crates.io/crates/warp)