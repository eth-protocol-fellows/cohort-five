# SSF Research

A novel consensus mechanism to achieve single slot finality with dynamic availability

## Motivation

Ethereum currently uses the Gasper protocol as its consensus mechanism. It is a complicated and intervowen mechanism between LMD-GHOST that provides availabilty and Casper-FFG which is responsible for finality. This creates several issues like reorg related attacks and longer finality times. Hence, there is an active effort towards Single Slot Finality. 

BFT mechanisms like Tendermint already provide single slot finality but using such protocols is an issue because they can halt if a supermajority of nodes are not online. Ethereum prioritises dynamic availabilty at all costs which makes existing designs like Tendermint infeasible for Ethereum. 

There has been research into this field and the development of a simple Single Slot Finality protocol by Francesco D’Amato and Luca Zanolini. The core idea behind their approach is to add another voting phase in the slot for fast finality. The main problem behind this design is the practical limitations of signature aggregation for millions of validators. 

Ethereum would not prefer an increase in the 32ETH staking requirement or the hardware requirements for running validators nodes. As a result, there has been more research on committee based design to address the issues of the SSF protocol. There have been some alternate designs like 3SF and Orbit SSF as well to evaluate exactly how a new consensus protocol for Ethereum should be implemented. 

## Project Description

There has been limited research done on dynamically available protocols. Most of the research around SSF has been on modifications to  LMD-GHOST based architectures. A major question in consensus research is to find a way to have dynamic availability that works well with committee based architectures. 

My goal for this project is to do research around novel consensus mechanism to acheive single slot finality with dynamic availabilty. This involves extensively researching existing architectures, understanding problems in those architectures, looking for novel designs like DAG based protocols and keeping mind the practical limitations of signature aggregation. 

### Why work on a novel mecahnism when there are several SSF protocols? 
- LMD-GHOST like protocols would require committee based architectures that don't work well for dynamic availability
- there are other problems that arise in GHOST like designs that may not be present in a novel protocol
- prevents tunnel view designs and provides a broad set of protocols to evaluate from

## Specification

The goal of the project would be to come up with a novel design and possibly publish it as an academic research paper. To achieve this, I must first continue going through existing literature and familiarize with research already done in this field. After gaining a deep understanding of consensus protocols, I will begin drawing out new designs that can provide finality with economic security within a single slot while also preserving dynamic availability. 

There has been relatively little research on dynamically available protocols so there must also be work done in that direction that can complement a novel protocol. Mostly the work done during the fellowship will comprise of reading academic research on all related topics and trying to come with new architectures. Occasional discussions and brainstorming sessions with subject experts can be very helpful.

## Roadmap

The project would comprise of three primary stages:
- Familiarising with existing research
- Brainstorming novel mechanisms
- Discussions and peer review for insights

The first stage would involve reading academic papers and resources along with discussions with the mentors to gain a comprehensive understanding of the landscape. The following concepts would require high attention: 
- LMD-GHOST and Gasper
- Dynamic Availability
- Other families of protocols
- DAG based protocols 
- Existing SSF research

This stage can take up 1-2 months to complete. 

The second and third stages would have a lot of back and forth and take a few months. It is possible that the final research may not be finished in time for the fellowship but I have developed a deep interest in consensus research and would ensure continued work on this project untill a valuable result can be provided.

## Possible challenges

The primary challenge of this project is of course the fact that coming up with a novel consensus mechanism is a huge task without any certainty of completion. I hope that with sincere dedication and some guidance from mentors, a note-worthy result is obtained from this fellowship. 

If despite my best efforts, a consensus mechanism could not be finalised, the existing domain knowledge would benefit greatly in contributing to other forms of research and even specification and prototyping for existing architectures.

## Project Goal

The end goal of a succesful completion of the project would be an academic paper that outlines a novel consensus mechanism that can potentially be considered to replace GAsper in its current form. 
This mechanism would have the following properties:
- Single Slot Finality
- Dynamic Availability
- Practically feasible with high economic security
- Does not increase validator requirements significantly
- No drastic increases in slot times from 12 seconds

## Collaborators

### Fellows 
N/A

### Mentors 
Francesco D'Amato

## Resources
TODO
