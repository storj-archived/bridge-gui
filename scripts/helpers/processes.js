/**
 * Ensures `processesToKill` and their child processes are killed
 * when `exitingProcess` exits, receives `SIGINT`, or has an
 * uncaught exception
 * @param {ChildProcess} exitingProcess - process to watch
 * @param {Array.<ChildProcess>} processesToKill - processes to kill
 */
export const killOnExit = (exitingProcess, processesToKill) => {
  const handler = () => {
    const processes = Array.isArray(processesToKill) ?
      processesToKill : [processesToKill];

    processes.forEach(doomed => doomed.kill('SIGTERM'));
    exitingProcess.exit();
  };

  exitingProcess.on('exit', handler.bind(null));
  exitingProcess.on('SIGTERM', handler.bind(null));
// catches ctrl+c event
  exitingProcess.on('SIGINT', handler.bind(null));
// catches uncaught exceptions
  exitingProcess.on('uncaughtException', handler.bind(null));
};

export const nextOnExit = (exitingProcess, next) => {
  exitingProcess.on('exit', next.bind(null));
  exitingProcess.on('SIGTERM', next.bind(null));
// catches ctrl+c event
  exitingProcess.on('SIGINT', next.bind(null));
// catches uncaught exceptions
  exitingProcess.on('uncaughtException', next.bind(null));
};
