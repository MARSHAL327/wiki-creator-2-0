import {makeAutoObservable} from "mobx";

class SectionsStore {
    animationOn = false

    constructor() {
        makeAutoObservable(this)
    }

    toggleAnimation(){
        this.animationOn = !this.animationOn
    }
}

export default new SectionsStore()