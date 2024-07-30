# Push Based Custom Ceiling Partial Withdrawal for EIP-7251 (MaxEB)
MaxEB, Withdrawal, Deposit, Staking, BeaconStake, Electra, Consensus, Economics

## Motivation

1.  [EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) improves MaxEB, and is [scoping](https://eips.ethereum.org/EIPS/eip-7600) into [Electra](https://ethereum.github.io/consensus-specs/specs/electra/beacon-chain/) Upgrade ([~2025/Q1](https://x.com/TimBeiko/status/1793684244612407687)), and with the mission to [sustain validator set size growth](https://ethresear.ch/t/sticking-to-8192-signatures-per-slot-post-ssf-how-and-why/17989), and preparing for [SSF](https://ethereum.org/en/roadmap/single-slot-finality/) and [ePBS](https://ethereum.org/en/roadmap/pbs/).
2.  I have [studied](https://hackmd.io/@georgesheth/HJKkx3NSR) that [EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) has 6 features and explains what they are. Push Based Custom Ceiling Partial Withdrawal is a feature still left for design and implementation, and it is demanded for before or post Electra Upgrade, due to its complexity, more details please see bellow analysis.
3.  This project aims to design and implement Push Based Custom Ceiling Partial Withdrawal at coding level ([Spec](https://ethereum.github.io/consensus-specs/specs/electra/beacon-chain/) and [Test](https://github.com/ethereum/execution-spec-tests)). In summary,


## Project description

1.  **[Staking withdrawals](https://ethereum.org/en/staking/withdrawals/)** refer to transfers of ETH from a validator account on Ethereum's consensus layer (the Beacon Chain), to the execution layer where it can be transacted with. Stakers have strong strong demands to withdraw their ETH in validator's account for various purpose. 
2.  There are two possible direction to trigger the withdrawals: `Pull-based withdrawals trigger` (e.g. EIP-4788) and `Push-based withdrawals trigger` (e.g. EIP-4895). So far, `Push-Based Withdrawals Trigger` is [more popular]((https://luozhu.mirror.xyz/ojI7HibWU8JcHR2DBUdWZ7WitIYpWXoZDuyEpyRwduk)) and has adopted by multiple EIPs. 
3.  Before EIP-7251, staking withdrawals looks like:
    1.  Requirement: Providing a withdrawal address is required before *any* funds can be transferred out of a validator account balance.
    2.  Push-based full exit withdrawal via voluntary exit: Users can **exit staking entirely**, unlocking their full validator balance.

        1.  Users sign and broadcast a "**voluntary exit**" message with validator keys which will start the process of exiting from staking. This is done with your validator client and submitted to your consensus node, and does not require gas.
        2.  The process of a validator exiting from staking takes variable amounts of time, depending on how many others are exiting at the same time. Once complete, this account will no longer be responsible for performing validator network duties, is no longer eligible for rewards, and no longer has their ETH "at stake". At this time the account will be marked as fully "withdrawable".
        3.  Once an account is flagged as "withdrawable", and withdrawal credentials have been provided, there is nothing more a user needs to do aside from wait. Accounts are automatically and continuously swept by block proposers for eligible exited funds, and your account balance will be transferred in full (also known as a "full withdrawal") during the next [sweep](https://ethereum.org/en/staking/withdrawals/#validator-sweeping).
    3.  Push-based MaxEB ceiling Partial withdrawal: **Reward payments of excess balance** over `MAX_EFFECTIVE_BALANCE` (currently set as 32 ETH) will automatically and regularly be sent to a withdrawal address linked to each validator, once provided by the user.

        1.  Any balance above 32 ETH earned through rewards does not actually contribute to principal, or increase the weight of this validator on the network, and is thus automatically withdrawn as a reward payment every few days.
        2.  Aside from providing a withdrawal address one time, these rewards do not require any action from the validator operator. This is all initiated on the consensus layer, thus no gas (transaction fee) is required at any step.
4.  After [EIP-7251](https://eips.ethereum.org/EIPS/eip-7251), MaxEB is increased from `32 ETH` to `2048 ETH`. It means there is a space for custom ceiling between `32 ETH` to `2048 ETH` which is defined by `MIN_ACTIVATION_BALANCE` and `MAX_EFFECTIVE_BALANCE`. 
    1.  Be more specific, any excess balance beyond the custom ceiling should enjoy the same mechanism as partial withdraw beyond MaxEB. 
    2.  Custom ceiling is not an issue [EIP-7251]((https://eips.ethereum.org/EIPS/eip-7251)), as both `both MAX_EFFECTIVE_BALANCE` and `MIN_ACTIVATION_BALANCE` equal to `32 ETH`. 
5.  What is the impact if we do not implement this custom ceiling partial wirthdrawal along/after [EIP-7251]((https://eips.ethereum.org/EIPS/eip-7251)):
    1.  Validators has to exit in order to use the stakes and rewards. 
    2.  It causes more other partial withdrawal queue on Execution Layer, and cost more gas fee to the stakers.  
6.  What is the benefti if we implement this feature:
    1.  This feature benefits to solo stakers to improve their stake financial efficiency. 
    2.  This feature benefits to institutional stakers to manage and control their staking strategy and operation.
    3.  This feature benefits to stakers to reblance stake across node operators, to reduce the risk of lock-in by specific providers. 
7.  The community discussed heavily on the timeline of this feature nearly in 5 out of 7 EIP-7251 breakout calls [1](https://hackmd.io/@wmoBhF17RAOH2NZ5bNXJVg/S1U86pzgR) [3](https://hackmd.io/@philknows/BJCaLJf1A#Custom-celings-To-be-continued-in-next-meeting) [4](https://hackmd.io/@philknows/Sy2kQAq1C?#Custom-Ceilings) [5](https://hackmd.io/YNy6vhDoQ8Ki6DQNv8tsWA#:~:text=In%20CALL%20%235%2C-,https%3A//hackmd.io/%40philknows/S1JbLXmlA%23Custom%2DCeilings,-Custom%20ceilings%20are) [6](https://hackmd.io/@philknows/Hywht12eR#Custom-Ceilings). And the conclusion is: 
    1.  This feature should be implemented. 
    2.  This feature has complexity, and the solid solution is not yet there. 
    3.  Due to the tight timeline for Electra upgrade, it should be push into another EIP with a solid approach. 
8.  This project target on this goal to design and implement a solid solution. 

![whiteboard_exported_image (49)](https://hackmd.io/_uploads/BJDPl8BKC.png)

## Specification

### Design 
![whiteboard_exported_image (51)](https://hackmd.io/_uploads/BJ0-ZLrF0.png)

### Research
1. We need to research on UX on how to setup a custom ceiling for a validator. 
2. We need to research on if and how to control custom ceiling set/update rate limit. 
3. We need to research on the impacts of custom ceiling to other existing features, e.g. deposit, top-up, validator consolidation, rewards/penality, withdrawal, etc. 

### Implementation
1.  Electra Spec already defined `PendingPartialWithdrawal` container and we can reuse.
2.  We need add a variable for custom ceiling in `Validator` construct.
3.  We need a help function to get the correct custom ceiling as there are some exceptions we need to handle.
4.  We need to update `process_withdrawal_request()` to update excess balance logic based on custom ceiling.
5.  We need to update `process_effective_balance_updates()` to take custom ceiling into considtion. 
6.  We need to implement in execution layer to set/update the validator's custom ceiling.
7.  We need to implement a control of the custom ceiling update speed.
8.  we need to get the request from the exeuction layer to update BeaconState.
9.  We need to update `process_epoch()` to process pending effective balance ceiling set/update. 
10. We need to update the hardfork test to take custom ceiling into consideration. 

## Roadmap

This project will roughly executed in three Phases. 
1. Phase 1 (3 weeks): socialise and finalise the design and publish the design document. 
2. Phase 2 (3 weeks): research on each topic and observe the comments and publish the research articles. 
3. Phase 3 (4 weeks): implement the functions and specs and publish the development document. 
4. Phase 4 (2 weeks): develop Pyspec test case and complete the test and PR for final updates to the spec and eips. 

## Possible challenges

1. This features needs to update on the validator variables, which cause the hardfork and need to develop a seperate trees. 
2. This features needs to bring a new UX to setup the custom ceiling. 
3. This features needs to research on the impacts to the staking economic and the risks to the ethereum stability. 


## Collaborators

### Fellows 

1. [George Shao](https://github.com/georgesheth)

### Mentors

To be updated.
Welcome suggestion and collaboration. 

## Resources
1.  My other relevent articles on EIP-7251:
    -  [BeaconState and Validator Balance for EIP-7251](https://hackmd.io/@georgesheth/BJGl24HYA)
    -  [History of EIP-7251](https://hackmd.io/@georgesheth/rJxnQBrtC)
    -  [Feature Lists of EIP-7251](https://hackmd.io/@georgesheth/HJKkx3NSR)
    -  [Implement EIP-7251](https://hackmd.io/@georgesheth/Hk2r2BHFC)

