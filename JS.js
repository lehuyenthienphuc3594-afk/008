// ===== Load Live2D model =====
const app = new PIXI.Application({
  view: document.getElementById("live2d"),
  autoStart: true,
  transparent: true,
  resizeTo: window
});

PIXI.live2d.Live2DModel.from("March7/March7.model3.json").then(model => {
  model.scale.set(0.3);
  model.x = 100;
  model.y = 400;
  app.stage.addChild(model);

  console.log("Live2D model loaded successfully!");
}).catch(err => {
  console.error("Error loading model:", err);
});

// ===== Chatbot logic =====
async function ask() {
  const q = document.getElementById("input").value;
  document.getElementById("chat").innerHTML += "<b>câu hỏi:</b> " + q + "<br>";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: q })
    });

    if (!response.ok) throw new Error("Network error: " + response.status);

    const data = await response.json();
    const ans = data.reply;

    document.getElementById("chat").innerHTML += "<b>DDD:</b> " + ans + "<br>";
    document.getElementById("input").value = "";
  } catch (err) {
    console.error(err);
    document.getElementById("chat").innerHTML += "<b>DDD</b> (Error: Could not reach AI)<br>";
  }
}
