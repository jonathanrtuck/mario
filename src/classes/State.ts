import { Entity, Universe, Viewport } from "@/types";

export class State {
  entities: Entity[];
  universe: Universe;
  viewport: Viewport;

  constructor({
    entities,
    universe,
    viewport,
  }: {
    entities: State["entities"];
    universe: State["universe"];
    viewport: State["viewport"];
  }) {
    this.entities = entities;
    this.universe = universe;
    this.viewport = viewport;
  }
}
