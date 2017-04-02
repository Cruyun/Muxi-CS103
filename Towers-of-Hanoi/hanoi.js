// This library exposes 3 functions:
//   hanoi.moveDisk(fromPeg, toPeg);  This moves the top disk from the fromPeg to the toPeg
//   hanoi.getSparePeg(fromPeg, toPeg); This returns the remaining peg that isn't the fromPeg or the toPeg
//   hanoi.isSolved(toPeg); This returns true if all disks are on toPeg and no invalid moves have been used

var solveHanoi = function(numDisks, fromPeg, toPeg) {
  if (numDisks === 0) {
    return;
  }

  var sparePeg = hanoi.getSparePeg(fromPeg, toPeg);
  //将除了最下面的disks移到sparePeg
  solveHanoi(numDisks-1, fromPeg, sparePeg);
  //fromPeg剩下数字最大的disk，移到toPeg
  hanoi.moveDisk(fromPeg, toPeg);
  solveHanoi(numDisks-1, sparePeg, toPeg);
};

solveHanoi(5, "A", "B");
