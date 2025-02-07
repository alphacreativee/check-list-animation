document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const {
    Engine,
    Render,
    Runner,
    Bodies,
    World,
    Events,
    Mouse,
    MouseConstraint,
  } = Matter;

  const matterBl = document.querySelector(".matter__bl");
  const matterLiItems = document.querySelectorAll(".matter__li");

  const paddingX = 30;
  const paddingY = 15;
  const cornerRadius = 15;
  const fontSet = "Bold 30px Syne";

  const marginFromEdges = 50;

  function initializeMatter() {
    const engine = Engine.create();
    const world = engine.world;

    const render = Render.create({
      element: matterBl,
      engine: engine,
      options: {
        width: matterBl.clientWidth,
        height: matterBl.clientHeight,
        wireframes: false,
        background: "transparent",
      },
    });
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    const walls = [
      Bodies.rectangle(matterBl.clientWidth / 2, 0, matterBl.clientWidth, 20, {
        isStatic: true,
        render: {
          fillStyle: "transparent",
        },
        density: 10,
      }),
      Bodies.rectangle(
        matterBl.clientWidth / 2,
        matterBl.clientHeight,
        matterBl.clientWidth,
        20,
        {
          isStatic: true,
          render: {
            fillStyle: "transparent",
          },
          density: 10,
        }
      ),
      Bodies.rectangle(
        0,
        matterBl.clientHeight / 2,
        20,
        matterBl.clientHeight,
        {
          isStatic: true,
          render: {
            fillStyle: "transparent",
          },
          density: 10,
        }
      ),
      Bodies.rectangle(
        matterBl.clientWidth,
        matterBl.clientHeight / 2,
        20,
        matterBl.clientHeight,
        {
          isStatic: true,
          render: {
            fillStyle: "transparent",
          },
          density: 10,
        }
      ),
    ];
    World.add(world, walls);

    const textBodies = [];
    matterLiItems.forEach((item) => {
      const text = item.textContent;
      const tempCanvas = document.createElement("canvas");
      const tempContext = tempCanvas.getContext("2d");
      tempContext.font = fontSet;

      const textMetrics = tempContext.measureText(text);

      const textWidth = textMetrics.width;
      const textHeight =
        textMetrics.actualBoundingBoxAscent +
        textMetrics.actualBoundingBoxDescent;

      const bodyWidth = textWidth + paddingX * 2;
      const bodyHeight = textHeight + paddingY * 2;

      let xPos =
        marginFromEdges +
        Math.random() * (matterBl.clientWidth - marginFromEdges * 2);

      let yPos =
        marginFromEdges +
        Math.random() * (matterBl.clientHeight - marginFromEdges * 2);

      const textBody = Bodies.rectangle(xPos, yPos, bodyWidth, bodyHeight, {
        restitution: 0.8,
        render: {
          fillStyle: "#b44205",
        },
        chamfer: { radius: cornerRadius },
      });

      textBody.text = text;
      textBody.textWidth = textWidth;
      textBody.textHeight = bodyHeight - paddingY;

      textBodies.push(textBody);
      World.add(world, textBody);
      if (
        xPos - bodyWidth / 2 < 0 ||
        xPos + bodyWidth / 2 > matterBl.clientWidth
      ) {
        Matter.Body.setPosition(textBody, {
          x: bodyWidth / 2 > marginFromEdges,
          y: yPos,
        });
      }

      if (
        yPos - bodyHeight / 2 < 0 ||
        yPos + bodyHeight / 2 > matterBl.clientHeight
      ) {
        Matter.Body.setPosition(textBody, {
          x: xPos,
          y: bodyHeight / 2 + marginFromEdges,
        });
      }
    });

    Events.on(render, "afterRender", function () {
      const context = render.context;
      context.font = fontSet;
      context.fillStyle = "#270f03";
      context.textAlign = "center";
      context.textBaseline = "middle";

      textBodies.forEach((body) => {
        const { x, y } = body.position;
        const angle = body.angle;

        context.save();
        context.translate(x, y);

        context.rotate(angle);
        context.fillText(body.text, 0, 0);
        context.restore();
      });
    });

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });
    World.add(world, mouseConstraint);
    render.mouse = mouse;

    Events.on(engine, "beforeUpdate", function () {
      textBodies.forEach((body) => {
        const { x, y } = body.position;
        const halfWidth = (body.bounds.max.x - body.bounds.min.x) / 2;
        const halfHeight = (body.bounds.max.y - body.bounds.min.y) / 2;

        if (x - halfWidth < 0) {
          Matter.Body.setPosition(body, { x: halfHeight, y });
          Matter.Body.setVelocity(body, {
            x: Math.abs(body.velocity.x),
            y: body.velocity.y,
          });
        }

        if (x + halfWidth > matterBl.clientWidth) {
          Matter.Body.setPosition(body, {
            x: matterBl.clientWidth - halfWidth,
            y,
          });
          Matter.Body.setVelocity(body, {
            x: -Math.abs(body.velocity.x),
            y: body.velocity.y,
          });
        }

        if (y - halfHeight < 0) {
          Matter.Body.setPosition(body, { x, y: halfHeight });
          Matter.Body.setVelocity(body, {
            x: body.velocity.x,
            y: Math.abs(body.velocity.y),
          });
        }

        if (y + halfHeight > matterBl.clientHeight) {
          Matter.Body.setPosition(body, {
            x,
            y: matterBl.clientHeight - halfHeight,
          });
          Matter.Body.setVelocity(body, {
            x: body.velocity.x,
            y: -Math.abs(body.velocity.y),
          });
        }
      });
    });
  }
  document.fonts.ready.then(initializeMatter);
});
