import { useState, useEffect } from "react";
function App() {
  const [position, setPosition] = useState([{ x: 5, y: 5 }]);
  const [position2, setPosition2] = useState({ x: 10, y: 10 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [gameover, setGameover] = useState(true);
  const [score, setScore] = useState(0);
  const gridsize = 20;

  const onKeyboardMove = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key == "ArrowUp") {
      setDirection({ x: 0, y: -1 });
    } else if (e.key == "ArrowDown") {
      setDirection({ x: 0, y: 1 });
    } else if (e.key == "ArrowLeft") {
      setDirection({ x: -1, y: 0 });
    } else if (e.key == "ArrowRight") {
      setDirection({ x: 1, y: 0 });
    }
  };

  useEffect(() => {
    if (gameover) return;
    const intervalId = setInterval(() => {
      setPosition((prevPosition) => {
        const newSnake = [...prevPosition];
        const head = {
          x: Math.max(
            0,
            Math.min(gridsize - 1, prevPosition[0].x + direction.x)
          ),
          y: Math.max(
            0,
            Math.min(gridsize - 1, prevPosition[0].y + direction.y)
          ),
        };

        if (
          head.x < 0 ||
          head.x >= gridsize ||
          head.y < 0 ||
          head.y >= gridsize ||
          newSnake.some(
            (segment) => segment.x === head.x && segment.y === head.y
          )
        ) {
          setGameover(true);
          setScore(0);
          return [{ x: 5, y: 5 }];
        }

        newSnake.unshift(head);
        newSnake.pop();
        return newSnake;
      });
    }, 100);

    return () => clearInterval(intervalId);
  }, [direction, gridsize, gameover]);

  const head = position[0];
  if (head.x == position2.x && head.y == position2.y) {
    setScore(score + 1);
    setPosition((prevPosition) => {
      const newSnake = [...prevPosition, { x: position2.x, y: position2.y }];

      return newSnake;
    });
    setPosition2({
      x: Math.max(
        0,
        Math.min(gridsize - 1, Math.floor(Math.random() * gridsize))
      ),
      y: Math.max(
        0,
        Math.min(gridsize - 1, Math.floor(Math.random() * gridsize))
      ),
    });
  }

  const cells = Array.from({ length: gridsize * gridsize });

  const iniciar = () => {
    setGameover(true);

    setPosition([{ x: 5, y: 5 }]);
    setDirection({ x: 1, y: 0 });
    setGameover(false);
  };
  const reiniciar = () => {
    setGameover(false);
    setPosition([{ x: 5, y: 5 }]);
    setDirection({ x: 1, y: 0 });
    setPosition2({
      x: Math.max(
        0,
        Math.min(gridsize - 1, Math.floor(Math.random() * gridsize))
      ),
      y: Math.max(
        0,
        Math.min(gridsize - 1, Math.floor(Math.random() * gridsize))
      ),
    });
    setGameover(true);
  };
  return (
    <div>
      <h1 className="text-center text-4xl mt-5 font-mono">Snake Game</h1>
      <h3 className="text-center text-1xl  font-mono">
        Perderas si chocas con los bordes
      </h3>
      <h3 className="text-center text-1xl font-mono">
        Perderas si chocas contra ti mismo
      </h3>
      <h3 className="text-center text-1xl font-mono">
        Utiliza las flechas del teclado
      </h3>
      <div
        onKeyDown={onKeyboardMove}
        className="flex gap-5 justify-center mt-5"
      >
        <p className="text-3xl ">Score: {score}</p>
        <button
          className="bg-emerald-400 p-2 font-mono  rounded-lg  "
          onClick={iniciar}
        >
          Start
        </button>
        <button
          className="bg-emerald-400 p-2 font-mono rounded-lg "
          onClick={reiniciar}
        >
          Restart
        </button>
      </div>

      <div
        className={`grid grid-cols-[repeat(${gridsize},1fr)] grid-rows-[repeat(${gridsize},1fr)]
           bg-slate-900   border-black max-w-[600px] h-[600px]
           m-auto  absolute top-20 bottom-0 left-0 right-0   `}
      >
        {cells.map((_, id) => (
          <div key={id} className=" w-[100%] h-[100%]"></div>
        ))}
        {position.map((p, id) => (
          <div
            key={id}
            className={`bg-emerald-400 absolute w-[28px] h-[28px] `}
            style={{
              transform: `translate(${p.x * 30}px, ${p.y * 30}px)`,
            }}
          ></div>
        ))}

        <div
          className="bg-red-400 absolute w-[28px] h-[28px] "
          style={{
            transform: `translate(${position2.x * 30}px, ${
              position2.y * 30
            }px)`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default App;
