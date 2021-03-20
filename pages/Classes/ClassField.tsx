import styles from '../../styles/Home.module.css'


// va a contener el valor del maximo de pasos que el robot se puede mover
enum Flags {
  LIMIT = 23,
}

// Enum de los posibles movimientos del robot en (X = FRONT AND BACK) y (X = UP AND DOWN)
enum SpeedLength {
  UP = 1,
  DOWN = -1,
  FRONT = 1,
  BACK = -1,
}

// Interfaz de las propiedades para X
interface X {
  front: number;
  back: number;
}

// Interfaz de las propiedades para Y
interface Y {
  up: number;
  down: number;
}

// Interfaz de las propiedades por las cuales se podra mover el robot
interface Speed {
  x: X;
  y: Y;
}

interface CoordinateInterface {
  x: number;
  y: number;
}

// Interfaz de las propiedades de los metodos de Breadth-first search
interface IQueue<T> {
  enqueue(item: T): void;
  dequeue(): T;
  size(): number;
}

// Clase que realizara el recorrido entre todos los nodos, verificar los nodos por donde pasa.
class Queue<T> implements IQueue<T> {
  private storage: T[] = [];

  constructor(private capacity: number = Infinity) { }

  // Method to add new nodes to check on a list
  enqueue(item: T): void {
    if (this.size() === this.capacity) {
      throw Error("Max capacity");
    }
    this.storage.push(item);
  }

  //  Method to delete the check all ready checked
  dequeue(): T | undefined {
    return this.storage.shift();
  }

  //
  size(): number {
    return this.storage.length;
  }
}

// Class of cordinate and implements CordinateInterface to get the properties
class Coordinate {
  // Variable to get the CordinateInterface properties
  private coordinate: CoordinateInterface;

  constructor(coordinate: CoordinateInterface) {
    this.coordinate = coordinate;
  }

  // Getter and setter of X cordinate
  public getX(): number {
    return this.coordinate.x;
  }
  public setX(x: number) {
    this.coordinate.x = x;
  }

  // Gettet and setter of Y cordinate
  public getY(): number {
    return this.coordinate.y;
  }
  public setY(y: number) {
    this.coordinate.y = y;
  }

  public getCoordinate() {
    return this.coordinate;
  }

  // Method to make the sum of cordinate X plus Cordinate Y
  public calculateNavasesh(): number {
    return this.sumAny(this.coordinate.x) + this.sumAny(this.coordinate.y);
  }

  // Method to make the sum of the cordinate of X or Y
  private navasesh(n: number): number {
    let sum = 0;
    const mod = 10;
    while (n > 0) {
      sum += n % mod;
      n = Math.floor(n / mod); // They convert the result of the sum in whole number
    }
    return sum;
  }

  // Method only por return a positive number
  private sumAny(n: number): number {
    const abs_value = Math.abs(n);
    if (abs_value < 9) return abs_value;
    else return this.navasesh(abs_value);
  }
}

class Field {
  // varables
  private limit_mined: number;
  private limit_field: number;
  private visited: Map<string, boolean>;
  private queue: Queue<[number, number]>;
  private moves: Array<[number, number]>;

  private total: number;

  constructor(limit_mined: number, limit_field: number, speed: Speed) {
    this.limit_mined = limit_mined;
    this.limit_field = limit_field;
    this.visited = new Map<string, boolean>();
    this.queue = new Queue<[number, number]>();
    this.moves = [];

    this.total = 0;
    // Push data to the move array
    this.moves.push([speed.x.back, 0]);
    this.moves.push([0, speed.x.front]);
    this.moves.push([speed.y.up, 0]);
    this.moves.push([0, speed.y.down]);
  }

  // Return the result of the node if there is a EMP Mine.
  private mined(coordinate: Coordinate): boolean {
    return coordinate.calculateNavasesh() > this.limit_mined;
  }

  // Method to calculate the area where the robot can access
  public calculateArea(): number {
    // variable of the cordinate and they initialize with 0 on X and Y
    const coordinate = new Coordinate({ x: 0, y: 0 });
    // Initialize the queue with 0 on X and Y for the Breadth-first search
    const initial_coordinate: [number, number] = [
      coordinate.getX(),
      coordinate.getY(),
    ];
    this.queue.enqueue(initial_coordinate);

    // Stop the loop when they check all the posible nodes
    while (this.queue.size() != 0) {
      let actual_point = this.queue.dequeue();

      // Method to add new points to visit
      const setVisited = (next_point: number[]): void => {
        this.visited.set(
          `x${next_point[0] + this.limit_field},y${next_point[1] + this.limit_field
          }`,
          true
        );
      };
      // Return the visited nodes
      const getVisited = (next_point: number[]): boolean => {
        return this.visited.get(
          `x${next_point[0] + this.limit_field},y${next_point[1] + this.limit_field
          }`
        );
      };

      // Method to set new Points to check
      const setNewPoint = (next_point: number[]): void => {
        coordinate.setX(next_point[0]);
        coordinate.setY(next_point[1]);
      };
      // Add the next node to check
      const setQueue = (next_point: number[]): void => {
        this.queue.enqueue([next_point[0], next_point[1]]);
      };
      // Increase the total if the node is safe
      const increaceTotal = (): void => {
        this.total++;
      };

      const checkAxisMoves = () => {
        // Check all the nodes arround
        this.moves.forEach((move) => {
          // Set a point to analyze for each node
          let next_point = [
            actual_point[0] + move[0],
            actual_point[1] + move[1],
          ];
          // Asign a param to the method getVisited
          let visited = getVisited(next_point);
          setNewPoint(next_point);

          let mined = this.mined(coordinate);
          // condicional if the point is visited and they don't have a bomb incrase the counter of safe points
          if (!visited && !mined) {
            increaceTotal();
            setVisited(next_point);
            setQueue(next_point);
          }
        });

        // Finalize the forEach to find all the nodes around
      };
      checkAxisMoves();
    }
    return this.total;
  }
}

const speed = {
  x: {
    front: SpeedLength.FRONT,
    back: SpeedLength.BACK,
  },
  y: {
    up: SpeedLength.UP,
    down: SpeedLength.DOWN,
  },
};

let mine_limit = Flags.LIMIT;

export default function ClassField() {
  const field_instance = new Field(mine_limit, 1000, speed);
  const result = field_instance.calculateArea();
  const area = result.toString();
  return (
    <a className={styles.card}>
      <h3>Safe Area</h3>
      <p>How large is the area that the robot can access?. Answer: {area}</p>
    </a>
  )
}
