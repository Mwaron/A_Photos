(() => {
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });

  // src/script.js
  var import_esm = __require("https://cdn.jsdelivr.net/npm/animejs/+esm");
  var btn = document.getElementById("ddbtn");
  var content = document.getElementById("ddct");
  btn.addEventListener("click", function(event) {
    event.stopPropagation();
    content.classList.toggle("show");
    console.log(content.classList.contains("show"));
  });
  document.addEventListener("click", function() {
    if (content.classList.contains("show")) {
      content.classList.remove("show");
      console.log(content.classList.contains("show"));
    }
  });
  (0, import_esm.animate)(".text", {
    opacity: [0, 0, 1],
    easing: "easeInOutQuad",
    duration: 1e3
  });
  var container = document.querySelector(".image-container");
  var overlay = container.querySelector(".overlay");
  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    overlay.style.clipPath = `circle(80px at ${x}px ${y}px)`;
  });
  container.addEventListener("mouseleave", () => {
    overlay.style.transition = "clip-path 0.8s ease";
    overlay.style.clipPath = "circle(0% at center)";
  });
  container.addEventListener("mouseenter", () => {
    overlay.style.transition = "none";
  });
})();
