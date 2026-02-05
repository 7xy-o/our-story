// script.js - كود المستويات الخمسة

// ==========================================
// 1. ضع اسم حسابك هنا
const instagramUsername = "sw092182"; 
// ==========================================

const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const question = document.getElementById('question');
const mainImage = document.getElementById('mainImage');
const igBtn = document.getElementById('igBtn');
const heartIcon = document.getElementById('heartIcon');
const audio = document.getElementById('bgMusic');

let yesScale = 1;
let noClickCount = 0;

// عبارات الرفض التي تتغير مع كل ضغطة
const rejectTexts = [
    "Are you sure?", 
    "Really sure?", 
    "Think again!", 
    "Look at him crying!", 
    "You're breaking his heart!", 
    "Don't be cruel!", 
    "Please?", 
    "Pretty please?", 
    "I'm dying here!", 
    "Have mercy!"
];

// مصفوفة صور الحزن بالترتيب (من 1 إلى 5)
const sadImages = [
    "fox-sad-1.png", // حزن خفيف
    "fox-sad-2.png", // بداية الدموع
    "fox-sad-3.png", // بكاء
    "fox-sad-4.png", // نحيب
    "fox-sad-5.png"  // انهيار
];

// الصور الثابتة الأخرى
const otherImages = {
    default: "fox-wait.png", // صورة الانتظار (تأكد من اسمها)
    happy: "fox-happy.png"   // صورة الفرح (تأكد من اسمها)
};

function rejectLove() {
    noClickCount++;
    yesScale += 0.5;
    yesBtn.style.transform =`scale(${yesScale})`;
    
    // تغيير النص
    let textIndex = Math.min(noClickCount, rejectTexts.length - 1);
    noBtn.innerText = rejectTexts[textIndex];

    // === منطق تغيير الصور حسب مستوى الحزن ===
    // نأخذ رقم الصورة بناءً على عدد الضغطات (ناقص 1 لأن المصفوفة تبدأ من 0)
    // نستخدم Math.min لكي لا نتجاوز الصورة رقم 5 مهما ضغطت
    let sadIndex = Math.min(noClickCount - 1, sadImages.length - 1);
    
    mainImage.src = sadImages[sadIndex];
    // ========================================

    if(audio) audio.play().catch(e => console.log("Audio needs interaction"));
}

function acceptLove() {
    question.innerText = "Yay! I knew it! ❤️";
    mainImage.src = otherImages.happy;
    
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    
    heartIcon.style.display = 'block';
    igBtn.style.display = 'block';
    igBtn.href =`https://ig.me/m/${instagramUsername}`;

    startFireworks();
    if(audio) audio.play();
}

// كود الألعاب النارية (كما هو)
function startFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    
    function createParticle(x, y) {
        const particle = {
            x: x, y: y,
            speed: Math.random() * 5 + 2,
            angle: Math.random() * Math.PI * 2,
            color:`hsl(${Math.random() * 360}, 100%, 50%)`,
            size: Math.random() * 5 + 2,
            life: 100
        };
        particles.push(particle);
    }

    function updateParticles() {
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            p.life--;
            p.size *= 0.95;
            if (p.life <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function loop() {
        if (Math.random() < 0.1) {
            for(let i=0; i<30; i++) {
                createParticle(Math.random() * canvas.width, Math.random() * canvas.height / 2);
            }
        }
        updateParticles();
        drawParticles();
        requestAnimationFrame(loop);
    }
    loop();
}