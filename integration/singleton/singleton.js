class Singleton {
    constructor() {
        if(!Singleton.instance){
            Singleton.instance = this;
        }
        return Singleton.instance
    }
    getInfo() {
        return "To jest instancja Singletona!"
    }
}

const singletonInstance1 =  new Singleton();
const singletonInstance2 = new Singleton();

console.log(singletonInstance1.getInfo())