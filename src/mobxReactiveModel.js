import {model} from "/src/TarotModel.js";
import { observable, configure, reaction } from "mobx";
import { connectToPersistence } from "./firestoreModel.js";

configure({ enforceActions: "never", });  // we don't use Mobx actions in the Lab

export const reactiveModel = observable(model);

// for degug purpose
window.myModel = reactiveModel;

connectToPersistence(reactiveModel, reaction);
