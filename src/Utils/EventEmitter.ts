import EventEmitter from "eventemitter3";

const eventEmitter = new EventEmitter();

const Emitter = {
  on: (event: string, fn: () => void) => eventEmitter.on(event, fn),
  once: (event: string, fn: (...args: any[]) => void) =>
    eventEmitter.once(event, fn),
  off: (event: string, fn: (...args: any[]) => void) =>
    eventEmitter.off(event, fn),
  emit: (event: string, payload?: any) => eventEmitter.emit(event, payload),
};

Object.freeze(Emitter);

enum EmitterAction {
  REFRESH_BALANCES = "REFRESH_BALANCES",
  BALANCE = "BALANCE",
}

export { Emitter, EmitterAction };
