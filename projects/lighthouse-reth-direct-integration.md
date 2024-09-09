# Direct(non-http) integration of Lighthouse-Reth
## Motivation
Through this we're aiming to get improved performance by eliminating JSON serialisation/deserialisation.Our goal would be to have Lighthouse still work with any EL client, while Lighthouse-Reth is just a convenient (and performant) option.

## Project description
We'll be creating a single repo with Reth & Lighthouse imported in it,and to connect Lighthouse to Reth ,instead of using HTTP RPC ,we'll be using regular function calls.

## Specification
- We'll import Lighthouse & Reth in a single repo
    - The core services of both will be running on the same executor,the structure should be similar to [lighthouse/src/main.rs](https://github.com/sigp/lighthouse/blob/stable/lighthouse/src/main.rs)
- For connecting Lighthouse to Reth we'll replace HTTP RPC with regular function calls
    - To do this we'll be abstracting the `ExecutionLayer` backend in Lighthouse by using a trait & then implementing that trait inside lighthouse-reth for the direct backend
        - The trait should contain all the methods that are currently on [`lighthouse/beacon_node/execution_layer/src/engine_api/http.rs#L681-L1285`](https://github.com/sigp/lighthouse/blob/9e12c21f268c80a3f002ae0ca27477f9f512eb6f/beacon_node/execution_layer/src/engine_api/http.rs#L681-L1285)
     - In Lighthouse upstream we'll change the definition of Engine to something like:
```rust
    pub struct Engine<Backend: ExecutionBackend = HttpJsonRpc> {
        pub api: Backend,
        payload_id_cache: Mutex<LruCache<PayloadIdCacheKey, PayloadId>>,
        state: RwLock<State>,
        latest_forkchoice_state: RwLock<Option<ForkchoiceState>>,
        executor: TaskExecutor,
        log: Logger,
    }
    //`ExecutionBackend` is the new trait and `HttpJsonRpc` is the default backend
```
- Then we'll propagate that type parameter change up to the `ExecutionLayer` struct

## Roadmap
 Here's the estimated timeline for Lighthouse-Reth
- phase 1 (8 weeks): The actual integration 
- phase 2 (3 weeks): Testing thoroughly & cleaning-up
- phase 3 (3 weeks): Getting feedback & iterating accordingly + creating docs

## Possible challenges



## Goal of the project

- Get the PR with the backend abstraction merged to Lighthouse
- Have a single third repo with Lighthouse integrated with Reth 
- Sync a node on mainnet or a testnet using the direct backend 

## Collaborators

### Fellows 

[Hamid Bateni](https://github.com/irnb)

### Mentors

[Michael Sproul](https://github.com/michaelsproul/)


## Resources

[list of resources that I am & will be using](https://hackmd.io/@threehrsleep/list-of-resources-for-my-epf-project)
