//jshint esversion: 6
/*jshint -W030, -W033, -W097, -W117*/

"use strict" 

class Container {
    constructor() {
        //console.log('container default constructor called');

        this._services = new Map();
        this._singleton = new Map();
    }

    register(name, definition, dependencies, singleton=false) {
        console.log(`Name => ${name} | Singleton => ${singleton}`);
        this._services.set(name, {definition: definition, dependencies: dependencies, singleton: singleton});
    }

    get(name) {
        if(name===null || name===undefined) {
            console.log('Invalid object name to be created');
            return;
        }

        let object_information = this._services.get(name);
        if(object_information) {
            if(object_information.singleton) {
                let object = this._singleton.get(name);
                if(!object) {
                    object = this._createObject(name);
                    this._singleton.set(name, object);
                }

                return object;
            }
            else {
                return this._createObject(name);
            }
        }
        else {
            //object is not registered yet. So please regieter it
            throw 'Please register definition of your object';
        }
    }

    _isclass(definition) {
        return definition === 'function';
    }

    _resolveDependencies(dependencies) {
        let dep = [];

        if(dependencies && Array.isArray(dependencies) && dependencies.length>0) {
            dep = dependencies.map((depObject, index) => {
                return this.get(depObject);
            });
        }

        return dep;
    }

    _createObject(name) {
        let obj;
        let object_definition = this._services.get(name);
        if(object_definition.definition) {
            let definition = object_definition.definition;
            if(this._isclass(definition)) {
                return new definition(...this._resolveDependencies(object_definition.dependencies));
            }
            else {
                return Object.assign({}, object_definition.definition);
            }
        }
    }
}

// let def1 = new config();
// def1.filename = 'def1.txt';
// def1.id = 1;
// def1.toString();

// let def2 = new Definition();
// def2.filename = 'def2.txt';
// def2.id = 2;
// def2.toString();

let container = new Container();
//export default container;

const config = {
    filename: 'filename',
    id: 0,
    toString: function() {
        //console.log(`file name is ${this.filename} and id is ${this.id}`);

        return `file name is ${this.filename} and id is ${this.id}`;
    }
};

// //registration
// container.register('config', config, [], false);

// //getting
// let obj1 = container.get('config');
// let obj2 = container.get('config');
// obj2.id = 1;
// let obj3 = container.get('config');
// obj3.id = 2;

// console.log(obj1.toString());
// console.log(obj2.toString());
// console.log(obj3.toString());

export default Container;