import {makeAutoObservable} from "mobx";

class SectionsStore {
    constructor() {
        makeAutoObservable(this)
    }
}

export default SectionsStore