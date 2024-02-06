# DiceSpec

> [!CAUTION]
> This project has been **archived and not maintained** since [DiceSpec v2](https://github.com/cp-20/dice-spec-v2) has been released.

DiceSpec is a service that collects little tools for TRPG.

![DiceSpec Image](/readme/image.png)

## Table of Contents
- [Functions](#Functions)
- [Features](#Features)
- [Contributions](#Contributions)

## Functions

### Dice Expecter

Calculate the expected value of the dice, etc. You can predict what kind of result you will get when you roll the dice.

### Dice Roll

You can roll any dice you like, and because it uses BCDice, it is as comfortable to use as a session tool such as CCFOLIA.

### CCFOLIA Export

When you fill in each item of your character, this tool formats it into a format that can be output to CCFOLIA. Conversely, it can also read from the CCFOLIA output format, which is useful when you want to change a few values here and there!

## Features

### Totally free

There is no charge to use DiceSpec.

### Nimble operation

DiceSpec is designed with performance in mind, with little time spent waiting for processing.

### Open source

DiceSpec is entirely developed as open source, and anyone is free to view and propose modifications. So users can use it with peace of mind.

## Contribution

### Bug Reports

Bug reports should be made to Issues in this repository or sent to [developer's twitter](https://twitter.com/__cp20__).

### Developer Quick Start

You need Git and Yarn as prerequisites.

Set up a local environment with the following command.

```
git clone https://github.com/cp-20/Dice-Spec
yarn
```

- development environment `yarn dev`
- production environment `yarn build && yarn start`
