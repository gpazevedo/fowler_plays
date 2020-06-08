
## Refactoring
An exercise from the first chapter of Martin Fowler's book Refactoring

### Original Version
1) Added the minimum code necessary for running the original code.
2) Added E2E testing
3) Applied the following refactoring techniques:
* *Extract function*
* *Replace temp with query*
* *Inline variable*
* *Change function declaration*
* *Split loop*
* *Slide statements*
* *Split phase*
* *Move function*
* *Replace loop with pipeline*

 At this point to make the next feature change: supporting more types of plays,
 each of those can have different calculations of the amount and the bonus.
 To add a new type the calculation functions need to be edited.

 To improve that Fowler uses *Replace Conditional with Polymorphism*.
 The benefit of this approach is that to introduce a new type, if necessary, 
 we create new functions specific for it, without modifying the rest of the system.

 I prefer a different approach: a form of *Parameterize Method*. 
 The definition of each type of play will be extended to
 include the parameter values used for its calculations.
 The benefits of this approach is that it requires no modification to:
 * add a new type of play
 * alter (update) the calculations of a type of play

First I will reorganize the files and add unit tests. Done !