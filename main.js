import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';

class BasicCharacterControllerProxy {
  constructor(animations) {
    this._animations = animations;
  }

  get animations() {
    return this._animations;
  }
};

// Regelt de character controller
class BasicCharacterController {
  constructor(params) {
    this._Init(params);
  }

  _Init(params) {
    this._params = params;
    // Vertragen
    this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
    // Optrekking
    this._acceleration = new THREE.Vector3(1, 0.25, 250.0);
    // Snelheid
    this._velocity = new THREE.Vector3(0, 0, 0);
    // Positie
    this._position = new THREE.Vector3();

    this._animations = {};
    this._input = new BasicCharacterControllerInput();
    this._stateMachine = new CharacterFSM(
      new BasicCharacterControllerProxy(this._animations));

    this._LoadModels('player.fbx');
  }

  _LoadModels(nameFile) {
    const loader = new FBXLoader();
    loader.setPath('./assets/player/');
    loader.load(nameFile, (fbx) => {
      fbx.scale.setScalar(0.1);
      fbx.traverse(c => {
        c.castShadow = true;
      });

      this._target = fbx;
      this._params.scene.add(this._target);

      this._mixer = new THREE.AnimationMixer(this._target);

      this._manager = new THREE.LoadingManager();
      this._manager.onLoad = () => {
        this._stateMachine.SetState('idle');
      };

      const _OnLoad = (animName, anim) => {
        const clip = anim.animations[0];
        const action = this._mixer.clipAction(clip);

        this._animations[animName] = {
          clip: clip,
          action: action,
        };
      };

      const loader = new FBXLoader(this._manager);
      loader.setPath('./assets/player/');
      loader.load('walk.fbx', (a) => { _OnLoad('walk', a); });
      loader.load('run.fbx', (a) => { _OnLoad('run', a); });
      loader.load('idle.fbx', (a) => { _OnLoad('idle', a); });
    });
  }

  get Position() {
    // First npc interaction
    if (this._position.x > 480 && this._position.x < 520 && this._position.z > 180 && this._position.z < 220) {
      document.getElementById("sectionChange").style.visibility = "visible"
    }
    if (this._position.x < 480) {
      document.getElementById("sectionChange").style.visibility = "hidden";
      document.getElementById("sectionChange2").style.visibility = "hidden";
      document.getElementById("sectionChange3").style.visibility = "hidden";
      document.getElementById("sectionChangeReaction").style.visibility = "hidden";
      document.getElementById("sectionChangeReaction2").style.visibility = "hidden";
      document.getElementById("sectionChangeReaction3").style.visibility = "hidden";
      document.getElementById("pngSchool2").style.visibility = "hidden";
    }
    if (this._position.x > 520) {
      document.getElementById("sectionChange").style.visibility = "hidden";
      document.getElementById("sectionChange2").style.visibility = "hidden";
      document.getElementById("sectionChange3").style.visibility = "hidden";
      document.getElementById("sectionChangeReaction").style.visibility = "hidden";
      document.getElementById("sectionChangeReaction2").style.visibility = "hidden";
      document.getElementById("sectionChangeReaction3").style.visibility = "hidden";
      document.getElementById("pngSchool2").style.visibility = "hidden";
    }

    document.getElementById("answer1").onclick = function () {
      document.getElementById("sectionChange").style.display = "none";
      document.getElementById("sectionChange2").style.visibility = "visible";
    };

    document.getElementById("answer2").onclick = function () {
      document.getElementById("sectionChange2").style.display = "none";
      document.getElementById("sectionChange3").style.visibility = "visible";
    };

    document.getElementById("noClose").onclick = function () {
      document.getElementById("sectionChange2.2NPC2").style.display = "none";
      document.getElementById("sectionChange2.2NPC4").style.display = "none";
    }

    document.getElementById("20").onclick = function () {
      document.getElementById("sectionChange3").style.display = "none";
      document.getElementById("sectionChangeReaction").style.visibility = "visible";
    };

    document.getElementById("60").onclick = function () {
      document.getElementById("sectionChange3").style.display = "none";
      document.getElementById("sectionChangeReaction3").style.visibility = "visible";
    };

    document.getElementById("90").onclick = function () {
      document.getElementById("sectionChange3").style.display = "none";
      document.getElementById("sectionChangeReaction2").style.visibility = "visible";
    };

    document.getElementById("close1").onclick = function () {
      document.getElementById("sectionChangeReaction").style.display = "none";
      document.getElementById("pngSchool2").style.visibility = "visible";
    }

    document.getElementById("close2").onclick = function () {
      document.getElementById("sectionChangeReaction2").style.display = "none";
      document.getElementById("pngSchool2").style.visibility = "visible";
    }

    document.getElementById("close3").onclick = function () {
      document.getElementById("sectionChangeReaction2").style.display = "none";
      document.getElementById("pngSchool2").style.visibility = "visible";
    }

    document.getElementById("close4").onclick = function () {
      document.getElementById("sectionChangeReaction2").style.display = "none";
      document.getElementById("pngSchool2").style.visibility = "visible";
    }

    document.getElementById("close5").onclick = function () {
      document.getElementById("sectionChangeReaction3").style.display = "none";
      document.getElementById("pngSchool2").style.visibility = "visible";
    }

    document.getElementById("close6").onclick = function () {
      document.getElementById("sectionChangeReaction3").style.display = "none";
      document.getElementById("pngSchool2").style.visibility = "visible";
    }

    document.getElementById("close7").onclick = function () {
      document.getElementById("sectionChangeReaction3").style.display = "none";
      document.getElementById("pngSchool2").style.visibility = "visible";
    }

    // NPC 2 interaction
    if (this._position.x > 480 && this._position.x < 520 && this._position.z < -180 && this._position.z > -220) {
      document.getElementById("sectionChangeNPC2").style.visibility = "visible";
    }
    if (this._position.x < 480) {
      document.getElementById("sectionChangeNPC2").style.visibility = "hidden";
      document.getElementById("sectionChange2NPC2").style.visibility = "hidden";
      document.getElementById("sectionChange2.1NPC2").style.visibility = "hidden";
      document.getElementById("sectionChange2.2NPC2").style.visibility = "hidden";
      document.getElementById("sectionChange3NPC2").style.visibility = "hidden";
      document.getElementById("sectionChange4NPC2").style.visibility = "hidden";
      document.getElementById("sectionChangeReaction1NPC2").style.visibility = "hidden";
      document.getElementById("sectionChangeReaction2NPC2").style.visibility = "hidden";
      document.getElementById("sectionChangeReaction3NPC2").style.visibility = "hidden";
      document.getElementById("pngSchool").style.visibility = "hidden";
    }
    if (this._position.x > 520) {
      document.getElementById("sectionChangeNPC2").style.visibility = "hidden";
      document.getElementById("sectionChange2NPC2").style.visibility = "hidden";
      document.getElementById("sectionChange2.1NPC2").style.visibility = "hidden";
      document.getElementById("sectionChange2.2NPC2").style.visibility = "hidden";
      document.getElementById("sectionChange3NPC2").style.visibility = "hidden";
      document.getElementById("sectionChange4NPC2").style.visibility = "hidden";
      document.getElementById("sectionChangeReaction1NPC2").style.visibility = "hidden";
      document.getElementById("sectionChangeReaction2NPC2").style.visibility = "hidden";
      document.getElementById("sectionChangeReaction3NPC2").style.visibility = "hidden";
      document.getElementById("pngSchool").style.visibility = "hidden";
    }

    document.getElementById("answer1NPC2").onclick = function () {
      document.getElementById("sectionChangeNPC2").style.display = "none";
      document.getElementById("sectionChange2.1NPC2").style.visibility = "visible";
    };

    document.getElementById("answer1.2NPC2").onclick = function () {
      document.getElementById("sectionChangeNPC2").style.display = "none";
      document.getElementById("sectionChange2.2NPC2").style.visibility = "visible";
    };

    document.getElementById("answer2.1NPC2").onclick = function () {
      document.getElementById("sectionChange2.1NPC2").style.display = "none";
      document.getElementById("sectionChange2NPC2").style.visibility = "visible";
    };

    document.getElementById("answer2NPC2").onclick = function () {
      document.getElementById("sectionChange2NPC2").style.display = "none";
      document.getElementById("sectionChange3NPC2").style.visibility = "visible";
    };

    document.getElementById("answer3NPC2").onclick = function () {
      document.getElementById("sectionChange2NPC2").style.display = "none";
      document.getElementById("sectionChange4NPC2").style.visibility = "visible";
    };

    document.getElementById("20NPC2").onclick = function () {
      document.getElementById("sectionChange3NPC2").style.display = "none";
      document.getElementById("sectionChange4NPC2").style.display = "none";
      document.getElementById("sectionChangeReaction1NPC2").style.visibility = "visible";
    };

    document.getElementById("20.1NPC2").onclick = function () {
      document.getElementById("sectionChange3NPC2").style.display = "none";
      document.getElementById("sectionChange4NPC2").style.display = "none";
      document.getElementById("sectionChangeReaction1NPC2").style.visibility = "visible";
    };

    document.getElementById("60NPC2").onclick = function () {
      document.getElementById("sectionChange3NPC2").style.display = "none";
      document.getElementById("sectionChange4NPC2").style.display = "none";
      document.getElementById("sectionChangeReaction2NPC2").style.visibility = "visible";
    };

    document.getElementById("60.1NPC2").onclick = function () {
      document.getElementById("sectionChange3NPC2").style.display = "none";
      document.getElementById("sectionChange4NPC2").style.display = "none";
      document.getElementById("sectionChangeReaction1NPC2").style.visibility = "visible";
    };

    document.getElementById("90NPC2").onclick = function () {
      document.getElementById("sectionChange3NPC2").style.display = "none";
      document.getElementById("sectionChange4NPC2").style.display = "none";
      document.getElementById("sectionChangeReaction3NPC2").style.visibility = "visible";
    };

    document.getElementById("90.1NPC2").onclick = function () {
      document.getElementById("sectionChange3NPC2").style.display = "none";
      document.getElementById("sectionChange4NPC2").style.display = "none";
      document.getElementById("sectionChangeReaction1NPC2").style.visibility = "visible";
    };

    // NPC 3 interaction
    if (this._position.x > 680 && this._position.x < 720 && this._position.z > 80 && this._position.z < 120) {
      document.getElementById("sectionChangeNPC3").style.visibility = "visible"
    }
    if (this._position.x < 680) {
      document.getElementById("sectionChangeNPC3").style.visibility = "hidden";
      document.getElementById("sectionChange2NPC3").style.visibility = "hidden";
      document.getElementById("sectionChange3NPC3").style.visibility = "hidden";
      document.getElementById("sectionChangeReaction2NPC3").style.visibility = "hidden";
      document.getElementById("sectionChangeReaction3NPC3").style.visibility = "hidden";
      document.getElementById("pngLieke").style.visibility = "hidden";
    }
    if (this._position.x > 720) {
      document.getElementById("sectionChangeNPC3").style.visibility = "hidden";
      document.getElementById("sectionChange2NPC3").style.visibility = "hidden";
      document.getElementById("sectionChange3NPC3").style.visibility = "hidden";
      document.getElementById("sectionChangeReaction2NPC3").style.visibility = "hidden";
      document.getElementById("sectionChangeReaction3NPC3").style.visibility = "hidden";
      document.getElementById("pngLieke").style.visibility = "hidden";
    }

    document.getElementById("answer1NPC3").onclick = function () {
      document.getElementById("sectionChangeNPC3").style.display = "none";
      document.getElementById("sectionChange2.1NPC3").style.visibility = "visible";
    };

    document.getElementById("answer1.2NPC3").onclick = function () {
      document.getElementById("sectionChangeNPC3").style.display = "none";
      document.getElementById("sectionChange2.2NPC3").style.visibility = "visible";
    };

    document.getElementById("answer2.1NPC3").onclick = function () {
      document.getElementById("sectionChange2.1NPC3").style.display = "none";
      document.getElementById("sectionChange2NPC3").style.visibility = "visible";
    };

    document.getElementById("answer2NPC3").onclick = function () {
      document.getElementById("sectionChange2NPC3").style.display = "none";
      document.getElementById("sectionChange3NPC3").style.visibility = "visible";
    };

    document.getElementById("answer3NPC3").onclick = function () {
      document.getElementById("sectionChange2NPC3").style.display = "none";
      document.getElementById("sectionChange4NPC3").style.visibility = "visible";
    };

    document.getElementById("20NPC3").onclick = function () {
      document.getElementById("sectionChange3NPC3").style.display = "none";
      document.getElementById("sectionChange4NPC3").style.display = "none";
      document.getElementById("sectionChangeReaction1NPC3").style.visibility = "visible";
    };

    document.getElementById("20.1NPC3").onclick = function () {
      document.getElementById("sectionChange3NPC3").style.display = "none";
      document.getElementById("sectionChange4NPC3").style.display = "none";
      document.getElementById("sectionChangeReaction1NPC3").style.visibility = "visible";
    };

    document.getElementById("60NPC3").onclick = function () {
      document.getElementById("sectionChange3NPC3").style.display = "none";
      document.getElementById("sectionChange4NPC3").style.display = "none";
      document.getElementById("sectionChangeReaction2NPC3").style.visibility = "visible";
    };

    document.getElementById("60.1NPC3").onclick = function () {
      document.getElementById("sectionChange3NPC3").style.display = "none";
      document.getElementById("sectionChange4NPC3").style.display = "none";
      document.getElementById("sectionChangeReaction1NPC3").style.visibility = "visible";
    };

    document.getElementById("90NPC3").onclick = function () {
      document.getElementById("sectionChange3NPC3").style.display = "none";
      document.getElementById("sectionChange4NPC3").style.display = "none";
      document.getElementById("sectionChangeReaction3NPC3").style.visibility = "visible";
    };

    document.getElementById("90.1NPC3").onclick = function () {
      document.getElementById("sectionChange3NPC3").style.display = "none";
      document.getElementById("sectionChange4NPC3").style.display = "none";
      document.getElementById("sectionChangeReaction1NPC3").style.visibility = "visible";
    };

    document.getElementById("closeNPC3").onclick = function () {
      document.getElementById("sectionChangeReaction1NPC3").style.display = "none";
      document.getElementById("pngLieke").style.visibility = "visible";
    }

    document.getElementById("close2NPC3").onclick = function () {
      document.getElementById("sectionChangeReaction2NPC3").style.display = "none";
      document.getElementById("pngLieke").style.visibility = "visible";
    }

    document.getElementById("close3NPC3").onclick = function () {
      document.getElementById("sectionChangeReaction3NPC3").style.display = "none";
      document.getElementById("pngLieke").style.visibility = "visible";
    }

    // NPC 4 interaction
    if (this._position.x > 130 && this._position.x < 170 && this._position.z < -180 && this._position.z > -220) {
      document.getElementById("sectionChangeNPC4").style.visibility = "visible"
    }
    if (this._position.x < 130) {
      document.getElementById("sectionChangeNPC4").style.visibility = "hidden";
      document.getElementById("sectionChange3NPC4").style.visibility = "hidden";
      document.getElementById("sectionChangeReactionNPC4").style.visibility = "hidden";
      document.getElementById("sectionChangeReaction2NPC4").style.visibility = "hidden";
      document.getElementById("sectionChangeReaction3NPC4").style.visibility = "hidden";
    }
    if (this._position.x > 170) {
      document.getElementById("sectionChangeNPC4").style.visibility = "hidden";
      document.getElementById("sectionChange3NPC4").style.visibility = "hidden";
      document.getElementById("sectionChangeReactionNPC4").style.visibility = "hidden";
      document.getElementById("sectionChangeReaction2NPC4").style.visibility = "hidden";
      document.getElementById("sectionChangeReaction3NPC4").style.visibility = "hidden";
    }

    document.getElementById("answer1NPC4").onclick = function () {
      document.getElementById("sectionChangeNPC4").style.display = "none";
      document.getElementById("sectionChange2.1NPC4").style.visibility = "visible";
    };

    document.getElementById("answer1.2NPC4").onclick = function () {
      document.getElementById("sectionChangeNPC4").style.display = "none";
      document.getElementById("sectionChange2.2NPC4").style.visibility = "visible";
    };

    document.getElementById("answer2.1NPC4").onclick = function () {
      document.getElementById("sectionChange2.1NPC4").style.display = "none";
      document.getElementById("sectionChange3NPC4").style.visibility = "visible";
    };

    document.getElementById("20NPC4").onclick = function () {
      document.getElementById("sectionChange3NPC4").style.display = "none";
      document.getElementById("sectionChangeReactionNPC4").style.visibility = "visible";
    };

    document.getElementById("60NPC4").onclick = function () {
      document.getElementById("sectionChange3NPC4").style.display = "none";
      document.getElementById("sectionChangeReaction2NPC4").style.visibility = "visible";
    };

    document.getElementById("90NPC4").onclick = function () {
      document.getElementById("sectionChange3NPC4").style.display = "none";
      document.getElementById("sectionChangeReaction3NPC4").style.visibility = "visible";
    };

    // NPC 5 interaction
    if (this._position.x > 30 && this._position.x < 70 && this._position.z > 30 && this._position.z < 70) {
      document.getElementById("sectionChangeNPC5").style.visibility = "visible"
    }
    if (this._position.x < 30) {
      document.getElementById("sectionChangeNPC5").style.visibility = "hidden";
      document.getElementById("sectionChange2NPC5").style.visibility = "hidden";
    }
    if (this._position.x > 70) {
      document.getElementById("sectionChangeNPC5").style.visibility = "hidden";
      document.getElementById("sectionChange2NPC5").style.visibility = "hidden";
    }

    document.getElementById("answer1NPC5").onclick = function () {
      document.getElementById("sectionChangeNPC5").style.display = "none";
      document.getElementById("sectionChange2NPC5").style.visibility = "visible";
    };

    document.getElementById("answer2NPC5").onclick = function () {
      document.getElementById("sectionChange2NPC5").style.display = "none";
    };

    return this._position;
  }

  get Rotation() {
    if (!this._target) {
      // Quaternion represents rotation doormiddel van XYZW components
      return new THREE.Quaternion();
    }
    return this._target.quaternion;
  }

  // Update het frame
  Update(timeInSeconds) {
    if (!this._stateMachine._currentState) {
      return;
    }

    this._stateMachine.Update(timeInSeconds, this._input);

    const velocity = this._velocity;
    const frameDecceleration = new THREE.Vector3(
      velocity.x * this._decceleration.x,
      velocity.y * this._decceleration.y,
      velocity.z * this._decceleration.z
    );
    frameDecceleration.multiplyScalar(timeInSeconds);
    frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
      Math.abs(frameDecceleration.z), Math.abs(velocity.z));

    velocity.add(frameDecceleration);

    const controlObject = this._target;
    const _Q = new THREE.Quaternion();
    const _A = new THREE.Vector3();
    const _R = controlObject.quaternion.clone();

    const acc = this._acceleration.clone();
    if (this._input._keys.shift) {
      acc.multiplyScalar(2.0);
    }
    if (this._input._keys.forward) {
      velocity.z += acc.z * timeInSeconds;
    }
    if (this._input._keys.backward) {
      velocity.z -= acc.z * timeInSeconds;
    }
    if (this._input._keys.left) {
      // Zet een positie neer
      _A.set(0, 1, 0);
      // zet een quaternion van rotatie gemaakt door de Axis & Angle
      // Axis is normaal terwijl Angle in radialen is
      _Q.setFromAxisAngle(_A, 4.0 * Math.PI * timeInSeconds * this._acceleration.y);
      _R.multiply(_Q);
    }
    if (this._input._keys.right) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * timeInSeconds * this._acceleration.y);
      _R.multiply(_Q);
    }

    controlObject.quaternion.copy(_R);

    const oldPosition = new THREE.Vector3();
    oldPosition.copy(controlObject.position);

    const forward = new THREE.Vector3(0, 0, 1);
    forward.applyQuaternion(controlObject.quaternion);
    forward.normalize();

    const sideways = new THREE.Vector3(1, 0, 0);
    sideways.applyQuaternion(controlObject.quaternion);
    sideways.normalize();

    sideways.multiplyScalar(velocity.x * timeInSeconds);
    forward.multiplyScalar(velocity.z * timeInSeconds);

    controlObject.position.add(forward);
    controlObject.position.add(sideways);

    this._position.copy(controlObject.position);

    if (this._mixer) {
      this._mixer.update(timeInSeconds);
    }
  }
};

class BasicCharacterControllerInput {
  constructor() {
    this._Init();
  }

  _Init() {
    this._keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      space: false,
      shift: false,
      interact: false,
    };
    document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
    document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
  }

  _onKeyDown(event) {
    switch (event.keyCode) {
      case 90: // z
        this._keys.forward = true;
        break;
      case 81: // q
        this._keys.left = true;
        break;
      case 65: // a
        this._keys.forward = true;
        break;
      case 87: // w
        this._keys.left = true;
        break;
      case 83: // s
        this._keys.backward = true;
        break;
      case 68: // d
        this._keys.right = true;
        break;
      case 16: // SHIFT
        this._keys.shift = true;
        break;
      case 69: // e ==> interact
        this._keys.interact = true;
        break;
      case 82: // r ==> reload
        location.reload();
        break;
      default:
    }
  }

  _onKeyUp(event) {
    switch (event.keyCode) {
      case 90: // z
        this._keys.forward = false;
        break;
      case 81: // q
        this._keys.left = false;
        break;
      case 65: // a
        this._keys.forward = false;
        break;
      case 87: // w
        this._keys.left = false;
        break;
      case 83: // s
        this._keys.backward = false;
        break;
      case 68: // d
        this._keys.right = false;
        break;
      case 16: // SHIFT
        this._keys.shift = false;
        break;
      case 69: // e ==> interact
        this._keys.interact = false;
        break;
      case 82: // r ==> reload
        location.reload();
        break;
      default:
    }
  }
};


class FiniteStateMachine {
  constructor() {
    this._states = {};
    this._currentState = null;
  }

  _AddState(name, type) {
    this._states[name] = type;
  }

  SetState(name) {
    const prevState = this._currentState;

    if (prevState) {
      if (prevState.Name === name) {
        return;
      }
      prevState.Exit();
    }

    const state = new this._states[name](this);

    this._currentState = state;
    state.Enter(prevState);
  }

  Update(timeElapsed, input) {
    if (this._currentState) {
      this._currentState.Update(timeElapsed, input);
    }
  }
};


class CharacterFSM extends FiniteStateMachine {
  constructor(proxy) {
    super();
    this._proxy = proxy;
    this._Init();
  }

  _Init() {
    this._AddState('idle', IdleState);
    this._AddState('walk', WalkState);
    this._AddState('run', RunState);
  }
};


class State {
  constructor(parent) {
    this._parent = parent;
  }

  Enter() { }
  Exit() { }
  Update() { }
};

class WalkState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'walk';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['walk'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.enabled = true;

      if (prevState.Name === 'run') {
        const ratio = curAction.getClip().duration / prevAction.getClip().duration;
        curAction.time = prevAction.time * ratio;
      } else {
        curAction.time = 0.0;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);
      }

      curAction.crossFadeFrom(prevAction, 0.5, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  Exit() {
  }

  Update(timeElapsed, input) {
    if (input._keys.forward || input._keys.backward) {
      if (input._keys.shift) {
        this._parent.SetState('run');
      }
      return;
    }

    this._parent.SetState('idle');
  }
};


class RunState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'run';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['run'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.enabled = true;

      if (prevState.Name === 'walk') {
        const ratio = curAction.getClip().duration / prevAction.getClip().duration;
        curAction.time = prevAction.time * ratio;
      } else {
        curAction.time = 0.0;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);
      }

      curAction.crossFadeFrom(prevAction, 0.5, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  Exit() {
  }

  Update(timeElapsed, input) {
    if (input._keys.forward || input._keys.backward) {
      if (!input._keys.shift) {
        this._parent.SetState('walk');
      }
      return;
    }

    this._parent.SetState('idle');
  }
};


class IdleState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'idle';
  }

  Enter(prevState) {
    const idleAction = this._parent._proxy._animations['idle'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;
      idleAction.time = 0.0;
      idleAction.enabled = true;
      idleAction.setEffectiveTimeScale(1.0);
      idleAction.setEffectiveWeight(1.0);
      idleAction.crossFadeFrom(prevAction, 0.5, true);
      idleAction.play();
    } else {
      idleAction.play();
    }
  }

  Exit() {
  }

  Update(_, input) {
    if (input._keys.forward || input._keys.backward) {
      this._parent.SetState('walk');
    }
  }
};

// Zet een third person camera
class ThirdPersonCamera {
  constructor(params) {
    this._params = params;
    this._camera = params.camera;

    this._currentPosition = new THREE.Vector3();
    this._currentLookat = new THREE.Vector3();
  }

  // Zet de camera verder van de speler
  _CalculateIdealOffset() {
    const idealOffset = new THREE.Vector3(-100, 100, -90);
    idealOffset.add(this._params.target.Position);
    return idealOffset;
  }

  // Zet de camera naar een punt waar de speler naar kijkt
  _CalculateIdealLookat() {
    const idealLookat = new THREE.Vector3(0, 5, 0);
    idealLookat.add(this._params.target.Position);
    return idealLookat;
  }

  Update(timeElapsed) {
    const idealOffset = this._CalculateIdealOffset();
    const idealLookat = this._CalculateIdealLookat();

    const t = 1.0 - Math.pow(0.001, timeElapsed);

    this._currentPosition.lerp(idealOffset, t);
    this._currentLookat.lerp(idealLookat, t);

    this._camera.position.copy(this._currentPosition);
    this._camera.lookAt(this._currentLookat);
  }
}

class Canvas {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this._threejs = new THREE.WebGLRenderer({
      antialias: true,
    });
    this._threejs.outputEncoding = THREE.sRGBEncoding;
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.setPixelRatio(window.devicePixelRatio);
    this._threejs.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this._threejs.domElement);

    window.addEventListener('resize', () => {
      this._OnWindowResize();
    }, false);

    const fov = 60;
    const aspect = 1920 / 1080;
    const near = 1.0;
    const far = 1000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.set(25, 10, 25);

    this._scene = new THREE.Scene();

    let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(-100, 100, 100);
    light.target.position.set(0, 0, 0);
    this._scene.add(light);

    // Adding light to scene
    light = new THREE.AmbientLight(0xFFFFFF, 0.25);
    this._scene.add(light);

    // Adding green plane
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(5000, 5000, 10, 10),
      new THREE.MeshStandardMaterial({
        color: 0xF5D7C8,
      }));
    plane.castShadow = false;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    this._scene.add(plane);

    this._mixers = [];
    this._previousRAF = null;

    // Laad het speelbaar model
    this._LoadAnimatedModel();
    // Eerste NPC
    this._LoadAnimatedModelAndPlay('./assets/npc/', 'npc.fbx', 'idleSad.fbx', new THREE.Vector3(500, 0, 200), -Math.PI / 2);
    // Tweede NPC
    this._LoadAnimatedModelAndPlay('./assets/npc/', 'npc.fbx', 'idleSad.fbx', new THREE.Vector3(500, 0, -200), -Math.PI / 3);
    // Derde NPC
    this._LoadAnimatedModelAndPlay('./assets/npc/', 'npc.fbx', 'greeting.fbx', new THREE.Vector3(700, 0, 100), -Math.PI / 2);
    // Welkom NPC
    this._LoadAnimatedModelAndPlay('./assets/npc/', 'npc.fbx', 'greeting.fbx', new THREE.Vector3(50, 0, 50), -Math.PI / 2);
    // Vierde NPC
    this._LoadAnimatedModelAndPlay('./assets/npc/', 'npc.fbx', 'idleSad.fbx', new THREE.Vector3(150, 0, -200), - Math.PI / 2);
    this._RAF();
    this._LoadModelStad();
    this._LoadModelMarkthal();
  }

  _LoadModelMarkthal() {
    const loader = new GLTFLoader();
    loader.load('./assets/markthal_2.glb', (gltf) => {
      gltf.scene.traverse(c => {
        c.castShadow = true;
      });
      gltf.scene.scale.setScalar(1);
      gltf.scene.rotation.y = -Math.PI / 1;
      this._scene.add(gltf.scene);
    });
  }

  _LoadAnimatedModelAndPlay(path, modelFile, animFile, offset, modelRotation) {
    const loader = new FBXLoader();
    loader.setPath(path);
    loader.load(modelFile, (fbx) => {
      fbx.scale.setScalar(0.1);
      fbx.rotation.y = modelRotation;
      fbx.traverse(c => {
        c.castShadow = true;
      });
      fbx.position.copy(offset);

      const anim = new FBXLoader();
      anim.setPath(path);
      anim.load(animFile, (anim) => {
        const m = new THREE.AnimationMixer(fbx);
        this._mixers.push(m);
        const idle = m.clipAction(anim.animations[0]);
        idle.play();
      });
      this._scene.add(fbx);
    });
  }

  _LoadModelStad() {
    const loader = new GLTFLoader();
    loader.load('./assets/school/StadV3.glb', (gltf) => {
      gltf.scene.traverse(c => {
        c.castShadow = true;
      });
      gltf.scene.scale.setScalar(12);
      gltf.scene.rotation.y = -Math.PI / 1;
      this._scene.add(gltf.scene);
    });
  }

  _LoadAnimatedModel() {
    const params = {
      camera: this._camera,
      scene: this._scene,
    }
    this._controls = new BasicCharacterController(params);

    this._thirdPersonCamera = new ThirdPersonCamera({
      camera: this._camera,
      target: this._controls,
    });
  }

  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
  }

  _RAF() {
    requestAnimationFrame((t) => {
      if (this._previousRAF === null) {
        this._previousRAF = t;
      }

      this._RAF();

      this._threejs.render(this._scene, this._camera);
      this._Step(t - this._previousRAF);
      this._previousRAF = t;
    });
  }

  _Step(timeElapsed) {
    const timeElapsedS = timeElapsed * 0.001;
    if (this._mixers) {
      this._mixers.map(m => m.update(timeElapsedS));
    }

    if (this._controls) {
      this._controls.Update(timeElapsedS);
    }

    this._thirdPersonCamera.Update(timeElapsedS);
  }
}

let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new Canvas();
});

document.getElementById("btn").onclick = function () {
  let intro = document.querySelector('.section__start');
  let obj = document.querySelector('.preloader');
  let inner = document.querySelector('.preloader_inner');
  let page = document.querySelector('.page');
  obj.classList.add('show');
  page.classList.remove('show');
  var w = 0,
    t = setInterval(function () {
      w = w + 1;
      inner.textContent = w + '%';
      if (w === 100) {
        obj.style.display = "none";
        inner.style.display = "none";
        page.style.display = "none";
        intro.style.display = "none";
        clearInterval(t);
        w = 0;
      }
    }, 20);
};

// Deze functie zorgt ervoor dat de frames mooi over elkaar lopen en niks blijft steken.
function _LerpOverFrames(frames, t) {
  const s = new THREE.Vector3(0, 0, 0);
  const e = new THREE.Vector3(100, 0, 0);
  const c = s.clone();

  for (let i = 0; i < frames; i++) {
    c.lerp(e, t);
  }
  return c;
}

function _TestLerp(t1, t2) {
  const v1 = _LerpOverFrames(100, t1);
  const v2 = _LerpOverFrames(50, t2);
  console.log(v1.x + ' | ' + v2.x);
}

_TestLerp(0.01, 0.01);
_TestLerp(1.0 / 100.0, 1.0 / 50.0);
_TestLerp(1.0 - Math.pow(0.3, 1.0 / 100.0),
  1.0 - Math.pow(0.3, 1.0 / 50.0));