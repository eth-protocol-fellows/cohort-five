# Project Proposal: 
# Native Support For Ephemery Testnet Implementation on Client Pair (Besu & Teku) Clients

## Tagline
Enabling seamless integration of the Ephemery testnet into Ethereum clients with dynamic genesis support.

## Motivation
Ephemery testnet offers an automatically resetting environment ideal for short-term testing of applications, validators, and client changes. It addresses problems like state bloat and lack of testnet funds in long-running testnets by resetting to genesis, clearing validators, and refilling faucets. This keeps the network small and easy to bootstrap. 

The primary challenge is managing the dynamic genesis, which resets periodically, unlike other networks with hardcoded genesis. 

Integrating Ephemery into clients like Teku and Besu enhances its usability by allowing configuration via a simple flag. This integration promotes experimentation and validation, strengthening the Ethereum ecosystem. 

The project focuses on client configuration and genesis handling, aiming to streamline testnet setup and operation.

## Project Description
The proposed solution involves implementing native support for the Ephemery testnet in both Teku (an Ethereum consensus client) and Besu (an Ethereum execution client). This will be achieved by introducing a new --ephemery flag that handles the dynamic genesis requirement. 

**The solution includes:**
- Developing a mechanism within each client to calculate or download the new genesis periodically.
- Creating an "Ephemery lib" or submodule within each client to handle genesis generation and reset functionality.
- Ensuring seamless integration with existing client architecture to support Ephemery's unique requirements.

## Specification

The detailed spec can be be found here [eip6916](https://eips.ethereum.org/EIPS/eip-6916)

**Feasibility Study:**

- Assess current client architectures and identify potential integration points for Ephemery.
- We conducted detailed technical analyses of clients, especially focusing on the reset function.
- Compile a feasibility report with findings and recommendations.

**Genesis Functionality:**

- Implement a dynamic genesis handling mechanism within both Teku and Besu clients.
- Develop a library/submodule in Java to manage genesis calculation or retrieval.

**Client Integration:**

- Modify the initialization process in both clients to recognize the --ephemery flag.
- Ensure that the clients can fetch or compute the genesis block before starting.

**Documentation and Tutorials:**
- Create comprehensive documentation and tutorials for developers to understand and utilize the new Ephemery functionality.

**Website Development:**
- Build an Ephemery website featuring a reset countdown, project overview, and documentation.

**Technical Details:**

**Teku Modifications:**
- Integrate the Ephemery lib to handle consensus layer genesis.
- Ensure compatibility with Teku's existing architecture for seamless integration.

**Besu Modifications:**
- Integrate the Ephemery lib for execution layer genesis handling.
- Align with Besu's architecture to maintain performance and stability.

## Roadmap

**Initial Research and Planning (2 weeks):**
- Understand client architectures and feasibility.
- Draft detailed implementation plans.

**Library/Submodule Development (4 weeks):**
- Develop the Ephemery lib for genesis handling.

**Client Integration (6 weeks):**
- Implement and test the --ephemery flag in Teku and Besu.
- Ensure clients correctly handle dynamic genesis.
- Implement genesis reset on Teku

**Documentation and Website (3 weeks):**
- Create user documentation and tutorials.
- Develop and launch the Ephemery website.

**Testing and Refinement (3 weeks):**
- Thoroughly test the integrated solution.
- Refine based on feedback and performance metrics.

### Deliverables

Here's a table summarizing the deliverables for the project:

| Timeline               | Phase                            | Deliverable                                             |
|------------------------|----------------------------------|---------------------------------------------------------|
| **July**               | **Initial Research and Planning** |- Understand client architectures and feasibility       |
| (Week 1 - 2)           |                                  | - Draft detailed implementation plans                   |
| **August**             | **Library/Submodule Development**| - Develop the Ephemery lib for genesis handling         |
| (Week 3 - 8)           |                                  |                                                         |
| **September**          | **Client Integration with Teku** | - Implement the --ephemery flag in Teku                 |
| (Week 9 - 12)          |                                  | - Test the --ephemery flag on Teku client               |
|                        |                                  | - Ensure Teku client correctly handles dynamic genesis  |
| **October**            | **Client Integration with Besu** | - Implement the --ephemery flag in Besu                 |
| (Week 13 - 16)         |                                  | - Test the --ephemery flag on Besu client               |
|                        |                                  | - Ensure Besu client correctly handles dynamic genesis  |
| **November**           | **Documentation and Website**    | - Create user documentation and tutorials               |
| (Week 17 - 20)         |                                  | - Develop and launch the Ephemery website               |
| **November**           | **Testing and Refinement**       | - Thoroughly test the integrated solution               |
| (Week 21 - 22)         |                                  | - Refine based on feedback and performance metrics      |


## Possible Challenges

**Dynamic Genesis Handling:**
- Ensuring reliable and timely genesis calculation or retrieval.
- Handling potential synchronization issues across clients.

**Client Compatibility:**
- Maintaining compatibility with existing client architectures and avoiding performance degradation.

**Comprehensive Testing:**
- Ensuring robust testing to catch and resolve edge cases and bugs.
- Development delays due to unforeseen technical complexities.




## Goal of the Project
Success for this project includes:

**Functional Integration:**
Teku and Besu clients can run the Ephemery testnet using the --ephemery flag seamlessly.

**Dynamic Genesis Support:**
Clients can dynamically handle the genesis block reset every period without manual intervention.

**Enhanced Usability:**
Comprehensive documentation, tutorials, and a dedicated website are available to support developers and users.

## Collaborators

**Fellows**
- Glory Agatevure

**Mentors**
- Mario Havel (Ephemery team)
- pk39 (Ephemery team)
- Paul Harris (Teku team)
- Sally Macfarla (Besu team)

## Resources
- https://ephemery.dev
- https://github.com/ephemery-testnet/ephemery-resources/issues/1
- https://eips.ethereum.org/EIPS/eip-6916
- https://docs.teku.consensys.io/
- https://besu.hyperledger.org/
-  https://hackmd.io/@HOL/Hyp4bXfV6
-  https://www.youtube.com/watch?v=O2ncr5LDd4g
-  https://www.youtube.com/watch?v=TvpaF5octkI 