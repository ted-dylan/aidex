document.addEventListener('DOMContentLoaded', () => {
    // Parallax Effect for Background
    const starsBg = document.getElementById('stars-bg');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (starsBg) {
            starsBg.style.transform = `translateY(${scrollY * 0.2}px)`;
        }
    });

    // Filter Functionality
    const filterChips = document.querySelectorAll('.filter-chip');
    const aiCards = document.querySelectorAll('.ai-card');

    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Remove active class from all
            filterChips.forEach(c => c.classList.remove('active'));
            // Add active to clicked
            chip.classList.add('active');

            const category = chip.getAttribute('data-category');

            // Filter cards
            aiCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    // Add a small animation when appearing
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Add simple fade in animation keyframes if not present
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .fade-in-up {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .fade-in-up.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(styleSheet);

    // Tilt Effect for Cards (Enhanced)
    aiCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Increased rotation
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

            // Move inner avatar slightly for depth
            const avatar = card.querySelector('.ai-avatar');
            if (avatar) {
                avatar.style.transform = `translateX(${rotateY * 0.5}px) translateY(${rotateX * 0.5}px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            const avatar = card.querySelector('.ai-avatar');
            if (avatar) {
                avatar.style.transform = 'translate(0,0)';
            }
        });
    });

    // Scroll Animations (IntersectionObserver)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.ai-card, .step-card, .use-case-item, .section-header').forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    // AI Profile Data
    const aiProfileData = {
        "Slide-디렉터": {
            name: "Slide-디렉터",
            role: "PPT 생성 자문 AI",
            desc: "막연한 아이디어를, 팔리는 문장으로 정제해주는 카피라이팅 연금술사.",
            skills: [
                "랜딩페이지 섹션 구조와 각 섹션 카피 초안 만들기",
                "배너·광고·SNS용 짧은 문장 여러 버전 생성",
                "기존 문장을 브랜드 톤에 맞게 리라이팅",
                "긴 설명을 한 줄 슬로건 / 헤드라인으로 압축"
            ],
            target: "초기 SaaS / B2B 스타트업 마케터, 1인 기업, 프리랜서 디자이너·개발자",
            tone: "친근하지만 핵심은 칼같이 짚는 스타트업 마케터 톤",
            scenarios: [
                "새 랜딩페이지를 만들기 직전에 전체 카피를 한 번에 뽑을 때",
                "정부지원사업·IR 요약본을 “홈페이지 소개 문구”로 바꿀 때",
                "광고 크리에이티브 A/B 테스트용 문구가 필요할 때"
            ],
            prompts: [
                "수출 SaaS 서비스를 위한 랜딩페이지 히어로 섹션 카피 3개만 만들어줘.",
                "이 회사 소개 문단을 홈페이지 About 섹션용 3문단 카피로 줄여줘.",
                "배너 광고용 짧은 문장 10개만 만들어줘."
            ],
            img: "slide_director.png"
        },
        "카피라이팅 연금술사": {
            name: "카피라이팅 연금술사",
            role: "카피라이팅 연금술사",
            desc: "막연한 아이디어를, 팔리는 문장으로 정제해주는 카피라이팅 연금술사.",
            skills: [
                "랜딩페이지 섹션 구조와 각 섹션 카피 초안 만들기",
                "배너·광고·SNS용 짧은 문장 여러 버전 생성",
                "기존 문장을 브랜드 톤에 맞게 리라이팅"
            ],
            target: "초기 SaaS / B2B 스타트업 마케터, 1인 기업",
            tone: "친근하지만 핵심은 칼같이 짚는 스타트업 마케터 톤",
            scenarios: [
                "새 랜딩페이지를 만들기 직전에 전체 카피를 한 번에 뽑을 때",
                "정부지원사업·IR 요약본을 “홈페이지 소개 문구”로 바꿀 때"
            ],
            prompts: [
                "수출 SaaS 서비스를 위한 랜딩페이지 히어로 섹션 카피 3개만 만들어줘.",
                "이 회사 소개 문단을 홈페이지 About 섹션용 3문단 카피로 줄여줘."
            ],
            img: "copywriting_alchemist.png"
        },
        "Site-빌더": {
            name: "Site-빌더",
            role: "웹사이트 제작 AI",
            desc: "목표와 텍스트만 주면, 전체 웹사이트 뼈대를 잡아주는 디지털 건축가.",
            skills: [
                "서비스/회사 설명을 읽고 홈·기능·가격·About 등 전체 페이지 구조 도출",
                "각 섹션의 제목, 서브텍스트, CTA 문구 초안 작성",
                "SEO/GEO 관점에서 필요한 콘텐츠 섹션 제안"
            ],
            target: "처음 웹사이트 만드는 창업자, 컨설턴트, 프리랜서",
            tone: "실무적인 제품 매니저 느낌, 선택지 몇 가지를 제안해주는 스타일",
            scenarios: [
                "TOTARO 온보딩 시, 최소 기능 사이트 구조 설계",
                "브랜드 리뉴얼 시 기존 메뉴 구조를 재정리하고 싶을 때"
            ],
            prompts: [
                "이 회사 소개 텍스트를 바탕으로 B2B SaaS 웹사이트 전체 메뉴 구조와 각 페이지 주요 섹션을 정의해줘.",
                "국문/영문 사이트를 모두 운영할 때 추천하는 정보 구조를 제안해줘."
            ],
            img: "site_builder.png"
        },
        "Biz-아키텍트": {
            name: "Biz-아키텍트",
            role: "사업계획서 작성 AI",
            desc: "흩어진 아이디어를, 심사위원이 읽을 수 있는 사업계획 구조로 재조립해주는 설계자.",
            skills: [
                "사업개요/문제정의/솔루션/시장/경쟁/수익모델/실행계획/재무 등 목차 설계",
                "텍스트를 3C·4P·Problem–Solution 구조로 재정렬",
                "IR용 요약본(1~2페이지)과 정부과제형 사업계획서 버전 분리 생성"
            ],
            target: "사업계획서/IR자료/내부기획서가 항상 뒤죽박죽인 대표·기획자",
            tone: "컨설턴트 스타일, 논리와 구조 집착",
            scenarios: [
                "정부지원사업/창업경진대회용 사업계획서 초안 만들 때",
                "투자 IR용 10~20페이지 덱을 처음 설계할 때"
            ],
            prompts: [
                "이 노션 페이지 내용을 기반으로 20페이지 분량 사업계획서 목차와 각 페이지에 들어갈 핵심 문장을 정리해줘.",
                "우리 서비스를 3C·4P 관점에서 정리하고, 경쟁사 대비 차별화를 드러내는 서술을 만들어줘."
            ],
            img: "biz_architect.png"
        },
        "Gov-스카우터": {
            name: "Gov-스카우터",
            role: "정부지원 사업 자문 AI",
            desc: "수많은 공고 속에서 우리와 맞는 정부지원사업만 골라주는 정찰병.",
            skills: [
                "공고문/요약문을 읽고 사업 목적·대상·지원형태·마감일 정리",
                "기업 단계/업종에 맞는 정부지원사업 유형(예비/초기/R&D/수출 등) 추천",
                "제안서에서 강조해야 할 평가 포인트 추론"
            ],
            target: "창업 초기 대표, 팀 리더, 연구실 교수/조교",
            tone: "공무원식 문장을 실무 언어로 번역해주는 해석자 느낌",
            scenarios: [
                "올해 우리 팀이 도전할 지원사업 종류를 전체적으로 지도 그리고 싶을 때",
                "특정 공고가 우리와 맞는지 1차 판단하고 싶을 때"
            ],
            prompts: [
                "우리는 초기에 매출은 거의 없고 SaaS를 개발 중인 팀이야. 이런 팀에게 맞는 정부지원사업 유형을 정리해줘.",
                "이 공고문을 요약해주고, 우리 같은 수출 SaaS 팀이 지원할 때 유리한 포인트/불리한 포인트를 나눠줘."
            ],
            img: "gov_scouter.png"
        },
        "Event-플래너": {
            name: "Event-플래너",
            role: "행사 기획 AI",
            desc: "“행사 한 번 해볼까?”라는 생각을, 구체적인 프로그램표와 체크리스트로 바꿔주는 행사 설계자.",
            skills: [
                "목적/규모/타깃에 맞는 행사 타입(밋업, 세미나, 워크숍, 네트워킹) 제안",
                "시간대별 세션 분배, 오프닝/메인/네트워킹 구성 추천",
                "필수 준비물·인력·홍보 채널 체크리스트 작성"
            ],
            target: "동아리/랩/스타트업에서 밋업·세미나를 여는 담당자",
            tone: "밝고 실무적인 프로젝트 매니저 느낌",
            scenarios: [
                "AI/스타트업 밋업을 2~3시간 짜리로 기획할 때",
                "정부과제 성과 발표 + 네트워킹 행사를 하나로 엮어야 할 때"
            ],
            prompts: [
                "20명 규모 AI 밋업을 기획하려고 해. 3시간짜리 프로그램 구성을 시간표 형태로 만들어줘.",
                "정부지원사업 성과발표 + 데모 + 네트워킹을 포함한 2시간 행사 구성을 제안해줘."
            ],
            img: "event_planner.png"
        },
        "Promo-감독": {
            name: "Promo-감독",
            role: "홍보 영상 꿀팁 AI",
            desc: "돈 많이 안 들이고도 그럴듯한 홍보 영상을 기획하게 해주는 숏폼 감독.",
            skills: [
                "15~60초 숏폼/홍보영상 콘셉트와 장면 구성 제안",
                "장면별 대사, 자막 카피, B-roll 아이디어 작성",
                "정부지원사업·성과보고용 영상 스토리 구조 설계"
            ],
            target: "영상 예산은 적지만 보여줄 건 많은 스타트업",
            tone: "크리에이티브 아이디어를 많이 던지는 감독 느낌",
            scenarios: [
                "TOTARO로 만든 랜딩페이지에 넣을 소개 영상 기획할 때",
                "정부과제 성과 공유회에서 상영할 영상 스토리를 짤 때"
            ],
            prompts: [
                "수출 SaaS 솔루션 소개 30초 홍보영상 콘티와 장면별 나레이션 스크립트를 만들어줘.",
                "정부지원사업 성과를 Before/After 구조로 보여주는 1분 영상 스토리라인 짜줘."
            ],
            img: "promo_director.png"
        },
        "AI 스캐너": {
            name: "AI 스캐너",
            role: "AI 정보 스캐너",
            desc: "최신 AI 트렌드를 스캔해서, 우리 비즈니스 언어로 번역해주는 분석 엔진.",
            skills: [
                "LLM, Agentic AI, RAG, MLOps 등의 개념을 이해하기 쉽게 정리",
                "특정 산업(수출/제조/금융/보험)에 맞는 AI 도입 아이디어 제안",
                "사업계획서·발표자료용 “시장/기술 동향” 문단 작성"
            ],
            target: "대표, 기획자, PM, 컨설턴트",
            tone: "과하게 기술용어를 쓰지 않고 풀어 설명하는 친절한 분석가",
            scenarios: [
                "“우리 서비스에 AI를 도입한다”는 대략의 로드맵부터 잡고 싶을 때",
                "사업계획서/발표에서 “왜 AI가 필요한가”를 설득력 있게 써야 할 때"
            ],
            prompts: [
                "Agentic AI와 Smart RAG의 차이, 그리고 각각 언제 쓰면 좋은지 요약해줘.",
                "국내 중소 제조사가 당장 쓸 수 있는 AI 활용 시나리오 3개만, 구체적인 예시와 함께 설명해줘."
            ],
            img: "ai_scanner.png"
        },
        "바이브 메이커": {
            name: "바이브 메이커",
            role: "Code-바이브메이커",
            desc: "“이런 거 만들고 싶은데…”라는 말을, 실제로 돌아가는 실험 코드 구조로 바꿔주는 코딩 조수.",
            skills: [
                "자연어 설명을 기반으로 Python/JS 등 기본 코드 뼈대 만들어주기",
                "프로젝트 폴더 구조·모듈 구조 설계",
                "간단한 버그 추정 및 리팩토링 아이디어 제안"
            ],
            target: "연구실/랩에서 빠르게 실험 코드 짜야 하는 학생·연구자",
            tone: "차분하지만 “이렇게 해보죠”라고 제안 많이 하는 페어 프로그래머 느낌",
            scenarios: [
                "새로운 모델/파이프라인 아이디어를 빠르게 프로토타입으로 옮기고 싶을 때",
                "기존 스파게티 코드를 조금씩 리팩토링하고 싶을 때"
            ],
            prompts: [
                "이 설명대로 동작하는 Python 패키지 기본 구조랑 init.py까지 설계해줘.",
                "이 에러 로그 보고 어디서 문제 났을 가능성이 높은지 추정해줘."
            ],
            img: "vibe_maker.png"
        },
        "ChatNews Sphere": {
            name: "ChatNews Sphere",
            role: "뉴스·인사이트 큐레이터",
            desc: "쏟아지는 뉴스와 정보를, 말 걸면 바로 정리해주는 대화형 뉴스 구체(球體).",
            skills: [
                "여러 기사/링크를 한 번에 받아 핵심만 뽑아 요약해주기",
                "특정 키워드·산업에 대한 최근 뉴스 흐름을 타임라인처럼 정리",
                "서로 다른 매체의 기사 표현·논조를 비교해서 공통점/차이점 정리"
            ],
            target: "뉴스·트위터는 많이 보는데 머릿속 정리가 안 되는 창업자/PM/기획자",
            tone: "팩트·맥락 중심의 차분한 뉴스 에디터 톤",
            scenarios: [
                "“오늘 AI/스타트업/정부지원 관련 핵심 뉴스만 골라보고 싶을 때”",
                "투자/사업계획/논문 시작 전에, 최근 기사 흐름을 한 번에 훑어보고 싶을 때"
            ],
            prompts: [
                "오늘자 국내외 생성형 AI 관련 주요 뉴스 5개만 골라서 요약해줘.",
                "이 세 기사 링크를 비교해서 공통점, 차이점, 유의할 포인트를 정리해줘."
            ],
            img: "chatnews_sphere.jpg",
            link: "https://www.chatnewssphere.com/"
        }
    };

    // Modal Logic - Event Delegation
    const modal = document.getElementById('profile-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalActionBtn = document.getElementById('modal-action-btn');

    console.log('Main.js loaded, setting up event delegation'); // Startup log

    document.body.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-outline');
        if (btn) {
            e.preventDefault();
            console.log('Delegated click detected on:', btn);

            const card = btn.closest('.ai-card');
            if (card) {
                const name = card.querySelector('h3').innerText.trim();
                console.log('AI Name:', name);
                const data = aiProfileData[name];

                if (data) {
                    console.log('Opening modal for:', data.name);
                    document.getElementById('modal-name').innerText = data.name;
                    document.getElementById('modal-role').innerText = data.role;
                    document.getElementById('modal-desc').innerText = data.desc;
                    document.getElementById('modal-img').src = data.img;
                    document.getElementById('modal-target').innerText = data.target;
                    document.getElementById('modal-tone').innerText = data.tone;

                    // Populate Lists
                    const skillsList = document.getElementById('modal-skills');
                    skillsList.innerHTML = data.skills.map(item => `<li>${item}</li>`).join('');

                    const scenariosList = document.getElementById('modal-scenarios');
                    scenariosList.innerHTML = data.scenarios.map(item => `<li>${item}</li>`).join('');

                    const promptsList = document.getElementById('modal-prompts');
                    promptsList.innerHTML = data.prompts.map(item => `<li>${item}</li>`).join('');

                    // Handle Action Button Link
                    if (data.link) {
                        modalActionBtn.onclick = () => window.open(data.link, '_blank');
                        modalActionBtn.style.display = 'block';
                    } else {
                        modalActionBtn.onclick = null;
                        // Optional: Hide button if no link, or keep it as a placeholder
                        // modalActionBtn.style.display = 'none'; 
                    }

                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                } else {
                    console.error('No profile data found for:', name);
                }
            }
        }
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Open Pokedex Button
    const openPokedexBtn = document.querySelector('.ai-core-floater .btn-primary.large');
    if (openPokedexBtn) {
        openPokedexBtn.addEventListener('click', () => {
            const pokedexSection = document.getElementById('pokedex');
            if (pokedexSection) {
                pokedexSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Random AI Button (Optional - for now links to Pokedex)
    const randomAiBtn = document.querySelector('.hero-buttons .btn-secondary');
    if (randomAiBtn) {
        randomAiBtn.addEventListener('click', () => {
            const pokedexSection = document.getElementById('pokedex');
            if (pokedexSection) {
                pokedexSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Explore Button
    const exploreBtn = document.querySelector('.hero-buttons .btn-primary');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            const pokedexSection = document.getElementById('pokedex');
            if (pokedexSection) {
                pokedexSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Hero Profile Button (ChatNews Sphere)
    const heroProfileBtn = document.getElementById('hero-profile-btn');
    if (heroProfileBtn) {
        heroProfileBtn.addEventListener('click', () => {
            const data = aiProfileData["ChatNews Sphere"];
            if (data) {
                document.getElementById('modal-name').innerText = data.name;
                document.getElementById('modal-role').innerText = data.role;
                document.getElementById('modal-desc').innerText = data.desc;
                document.getElementById('modal-img').src = data.img;
                document.getElementById('modal-target').innerText = data.target;
                document.getElementById('modal-tone').innerText = data.tone;

                // Populate Lists
                const skillsList = document.getElementById('modal-skills');
                skillsList.innerHTML = data.skills.map(item => `<li>${item}</li>`).join('');

                const scenariosList = document.getElementById('modal-scenarios');
                scenariosList.innerHTML = data.scenarios.map(item => `<li>${item}</li>`).join('');

                const promptsList = document.getElementById('modal-prompts');
                promptsList.innerHTML = data.prompts.map(item => `<li>${item}</li>`).join('');

                // Handle Action Button Link
                if (data.link) {
                    modalActionBtn.onclick = () => window.open(data.link, '_blank');
                    modalActionBtn.style.display = 'block';
                }

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

});
