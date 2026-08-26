function openGift(type) {
    const message = document.getElementById("message");

    if (type === "letter") {
        openLetter(message);
    } else if (type === "crossword") {
        openCrossword(message);
    } else if (type === "songs") {
        openSongs(message);
    }
}

function openLetter(message) {
    message.innerHTML = `
        <div class="love-letter">
            <div class="letter-content">
                <p>Happy Bday Gav ❤️</p>

                <p>
                    Wish I was there to celebrate it with you,
                    but we'll just have to do that a little later..
                </p>

                <p>
                    I was thinking a lot about what to do for your birthday, and I
                    realised how difficult it is to think of a gift for someone you
                    can't see in person o.o. I wanted it to be something special, and
                    as you know, I'm a perfectionist. Since we both studied data science/computer science,
                    I thought coding a website would be pretty cool. I didn't just want
                    to use some template because that felt too easy, so I tried coding it
                    myself. With the help of AI correcting my stupid errors (apparently I forgot
                    to close my code many, many times lol), I eventually got it to what I (kinda) wanted.
                    Sigh, so please don't judge because it all looks very basic, but let's just say
                    I tried my best *sobs*.
                </p>

                <p>
                    Anyways, I just wanted to say that I'm reaaaaally glad I met you c:
                    You've become such an important person in my life, and I hope it stays
                    that way forever and ever (and ever). I don't think I'll ever meet
                    someone like you. We have such a good connection, especially in such
                    a short amount of time. I used to think that wasn't even possible,
                    but my whole life changed because of you, and I'm really grateful for that.
                </p>

                <p>
                    You're really kindhearted, and I hope I can give you a feeling you've
                    never experienced before. I really appreciate you, and I want to do
                    whatever I can to make you feel happy (or is this what guys are supposed
                    to say? o.o idk). But I really do care about you. Although we might
                    show that we care in different ways, I hope you can still feel that I do.
                </p>

                <p>
                    I look forward to spending more time together and making new memories :3.
                    Tbh, I have so many things I want to tell you, but I'll save them for
                    when I see you (also, they don't really fit being written in a birthday
                    letter lol).
                </p>

                <p>
                    For now, I just hope you have the best birthday ever, because you deserve it.
                </p>

                <p class="letter-signoff">
                    Love, Meg ❤️
                </p>
            </div>
        </div>
    `;
}

const GRID_SIZE = 20;

const words = [
    {
        answer: "VANILLA",
        row: 5,
        col: 1,
        dir: "across",
        clue: 1,
        extract: {
            pos: 4,
            box: 1
        }
    },
    {
        answer: "VIRGO",
        row: 5,
        col: 1,
        dir: "down",
        clue: 4,
        extract: {
            pos: 1,
            box: 4
        }
    },
    {
        answer: "KOREA",
        row: 9,
        col: 0,
        dir: "across",
        clue: 5,
        extract: {
            pos: 4,
            box: 5
        }
    },
    {
        answer: "LEAGUE",
        row: 8,
        col: 3,
        dir: "down",
        clue: 8,
        extract: {
            pos: 5,
            box: 8
        }
    },
    {
        answer: "FEBRUARY",
        row: 13,
        col: 2,
        dir: "across",
        clue: 6,
        extract: {
            pos: 8,
            box: 6
        }
    },
    {
        answer: "DISCORD",
        row: 8,
        col: 8,
        dir: "down",
        clue: 7,
        extract: {
            pos: 5,
            box: 7
        }
    },
    {
        answer: "FALL",
        row: 3,
        col: 5,
        dir: "down",
        clue: 2,
        extract: {
            pos: 3,
            box: 2
        }
    },
    {
        answer: "WATERMELON",
        row: 4,
        col: 4,
        dir: "across",
        clue: 3,
        extract: {
            pos: 9,
            box: 3
        }
    }
];

function openCrossword(message) {
    message.innerHTML = `
        <div class="crossword">
            <h2>Crossword</h2>

            <p class="cross-sub">
                Don't forget to look at the secret message below :(
            </p>

            <div id="grid" class="grid"></div>

            <div class="clues-wrap">
                <div class="clue-col">
                    <h3>Across →</h3>
                    <p><b>1.</b> Favourite ice cream flavour</p>
                    <p><b>3.</b> Favourite fruit</p>
                    <p><b>5.</b> Country we wanted to travel to</p>
                    <p><b>6.</b> Month we first talked</p>
                </div>

                <div class="clue-col">
                    <h3>Down ↓</h3>
                    <p><b>2.</b> Favourite season</p>
                    <p><b>4.</b> Zodiac sign</p>
                    <p><b>7.</b> Platform we met</p>
                    <p><b>8.</b> Favourite game</p>
                </div>
            </div>

            <div class="secret-wrap">
                <h3>Secret message</h3>

                <div class="secret-row">
                    <div class="secret-box" id="m1"></div>
                    <div class="secret-box" id="m2"></div>
                    <div class="secret-box" id="m3"></div>
                    <div class="secret-box" id="m4"></div>
                    <div class="secret-box" id="m5"></div>
                    <div class="secret-box" id="m6"></div>
                    <div class="secret-box" id="m7"></div>
                    <div class="secret-box" id="m8"></div>
                </div>
            </div>

            <button class="check-btn" type="button" onclick="checkCrossword()">
                Check puzzle
            </button>

            <div id="result"></div>
        </div>
    `;

    drawCrossword();
}

function buildGrid() {
    const grid = Array.from(
        { length: GRID_SIZE },
        () => Array(GRID_SIZE).fill(null)
    );

    words.forEach(word => {
        [...word.answer].forEach((letter, index) => {
            const row = word.dir === "down"
                ? word.row + index
                : word.row;

            const col = word.dir === "across"
                ? word.col + index
                : word.col;

            if (grid[row][col] && grid[row][col].letter !== letter) {
                console.error(
                    "Wrong crossing:",
                    word.answer,
                    letter,
                    row,
                    col
                );
            }

            if (!grid[row][col]) {
                grid[row][col] = {
                    letter,
                    clueStart: null,
                    extractBox: null
                };
            }

            if (index === 0 && !grid[row][col].clueStart) {
                grid[row][col].clueStart = word.clue;
            }

            if (word.extract.pos === index + 1) {
                grid[row][col].extractBox = word.extract.box;
            }
        });
    });

    return grid;
}

function drawCrossword() {
    const gridElement = document.getElementById("grid");
    const data = buildGrid();

    gridElement.innerHTML = "";

    const bounds = getGridBounds(data);

    gridElement.style.gridTemplateColumns =
        `repeat(${bounds.width}, 40px)`;

    for (let row = bounds.minRow; row <= bounds.maxRow; row++) {
        for (let col = bounds.minCol; col <= bounds.maxCol; col++) {
            const cell = data[row][col];

            if (!cell) {
                createBlackCell(gridElement);
            } else {
                createLetterCell(gridElement, cell);
            }
        }
    }
}

function getGridBounds(grid) {
    let minRow = GRID_SIZE;
    let maxRow = 0;
    let minCol = GRID_SIZE;
    let maxCol = 0;

    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (!grid[row][col]) {
                continue;
            }

            minRow = Math.min(minRow, row);
            maxRow = Math.max(maxRow, row);
            minCol = Math.min(minCol, col);
            maxCol = Math.max(maxCol, col);
        }
    }

    return {
        minRow,
        maxRow,
        minCol,
        maxCol,
        width: maxCol - minCol + 1
    };
}

function createBlackCell(gridElement) {
    const cell = document.createElement("div");
    cell.className = "black";
    gridElement.appendChild(cell);
}

function createLetterCell(gridElement, cellData) {
    const cell = document.createElement("div");
    cell.className = "cell";

    if (cellData.clueStart) {
        const clueNumber = document.createElement("span");
        clueNumber.className = "clue-number";
        clueNumber.textContent = cellData.clueStart;
        cell.appendChild(clueNumber);
    }

    if (cellData.extractBox) {
        const extractNumber = document.createElement("span");
        extractNumber.className = "extract-number";
        extractNumber.textContent = cellData.extractBox;
        cell.appendChild(extractNumber);
    }

    const input = document.createElement("input");
    input.maxLength = 1;
    input.dataset.answer = cellData.letter;

    input.addEventListener("input", () => {
        input.value = input.value.toUpperCase();
        updateSecretMessage();
    });

    cell.appendChild(input);
    gridElement.appendChild(cell);
}

function updateSecretMessage() {
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
        const input = cell.querySelector("input");
        const extract = cell.querySelector(".extract-number");

        if (!extract) {
            return;
        }

        const boxNumber = extract.textContent;
        const secretBox = document.getElementById(`m${boxNumber}`);

        secretBox.textContent = input.value;
    });
}

function checkCrossword() {
    const inputs = document.querySelectorAll(".cell input");

    const correct = [...inputs].every(input =>
        input.value.toUpperCase() === input.dataset.answer
    );

    document.getElementById("result").innerHTML = correct
        ? "💗"
        : "Stupid ass bitch";
}

function openSongs(message = document.getElementById("message")) {
    const playlistUrl =
        "https://open.spotify.com/playlist/0qSWs787sGAi1BWYLFkwAk";

    const qrCodeUrl =
        `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(playlistUrl)}`;

    message.innerHTML = `
        <div class="music-story">
            <h2>Our Story</h2>

            <p>
                Before you read anything...
            </p>

            <div class="playlist-qr">
                <div class="qr-code">
                    <img
                        src="${qrCodeUrl}"
                        alt="QR code for our Spotify playlist"
                    >
                </div>

                <button
                    class="scanned-btn"
                    type="button"
                    onclick="showSongStory()"
                >
                    I scanned it 💗
                </button>
            </div>
        </div>
    `;
}

function showSongStory() {
    const message = document.getElementById("message");

    message.innerHTML = `
        <div class="music-story">
            <h2>The Story of Us</h2>

            <p>
                You've always made playlists for me, so I wanted to make one for you too.
                But instead of just putting together songs I like, I chose 10 songs that
                remind me of how I felt about you at different points in our story.
            </p>

            <div class="song-item">
                <img
                    class="song-cover"
                    src="images/begin-again.png"
                    data-album="images/begin-again.png"
                    data-lyrics="images/begin-again-lyrics.jpeg"
                    onclick="toggleSongImage(this)"
                    alt="Begin Again album cover"
                >

                <div class="song-content">
                    <h3>01 — Begin Again</h3>

                    <p>
                        This is where it all started. When I first met you,
                        I started noticing something I had never felt before.
                        Everything just felt different with you. I'm not sure if it
                        was the way you talked to me, your weird sense of humour or the way we laughed about the
                        same things, but there was just something. Like I told you before, I felt like I needed to be
                        friends with you, no matter what. I really wanted you to be a part of my life.
                    </p>

                    <p>
                        I did talk to others first for a few weeks, and it was fun, but it felt
                        like I wasn't truly myself around them. You understood what I was saying,
                        you got my jokes, you played along them, and you even finished my sentences.
                        And that was only our first call.
                    </p>

                    <p>
                        Looking back, it feels like that was the moment I could
                        kind of "begin again". To let go of all my problems,
                        and start all over again, but make different choices
                        this time.
                    </p>
                </div>
            </div>

            <div class="song-item">
                <img
                    class="song-cover"
                    src="images/you-belong-with-me.jpg"
                    data-album="images/you-belong-with-me.jpg"
                    data-lyrics="images/you-belong-with-me-lyrics.jpeg"
                    onclick="toggleSongImage(this)"
                    alt="You Belong With Me album cover"
                >

                <div class="song-content">
                    <h3>02 — You Belong With Me</h3>

                    <p>
                        When you were talking to someone else at the time, I remember
                        already having this stupid little thought that maybe you and
                        I just made more sense.
                    </p>

                    <p>
                        We had only talked for a little while, but somehow I was already
                        making these little connections in my head, like, "Does she like
                        playing pool too?" or "Is her favourite fruit watermelon as well?" or
                        even "Does she make you laugh the way I do?". I can't lie, I did
                        feel a little bittersweet about it.
                    </p>
                </div>
            </div>

            <div class="song-item">
                <img
                    class="song-cover"
                    src="images/best-friend.jpg"
                    data-album="images/best-friend.jpg"
                    data-lyrics="images/best-friend-lyrics.jpeg"
                    onclick="toggleSongImage(this)"
                    alt="Best Friend album cover"
                >

                <div class="song-content">
                    <h3>03 — Best Friend</h3>

                    <p>
                        When we were both free to talk to anyone, we started talking
                        to each other more. We would watch anime and movies together,
                        play games, have deep conversations, and just spend a lot of
                        time together. You became like a best friend to me in such a short
                        amount of time.
                    </p>

                    <p>
                        I think those deep conversations were what really made me
                        feel even closer to you, especially the more emotional ones.
                        I had never shared so much with someone before, not even with
                        friends I had known for a long time. I remember always wondering
                        why I felt so comfortable opening up to you and sharing those
                        things with you so quickly.
                    </p>
                </div>
            </div>

            <div class="song-item">
                <img
                    class="song-cover"
                    src="images/i-like-me-better.png"
                    data-album="images/i-like-me-better.png"
                    data-lyrics="images/i-like-me-better-lyrics.jpeg"
                    onclick="toggleSongImage(this)"
                    alt="I Like Me Better album cover"
                >

                <div class="song-content">
                    <h3>04 — I Like Me Better</h3>

                    <p>
                        The more we talked, the more I realised that we just
                        naturally clicked. It wasn't just your humour or the interests
                        we shared anymore. It was also your thoughts, your values, and
                        the way you looked at things. I LOVED hearing your point of view
                        on certain things because I would either completely agree with you
                        or find myself thinking, "Why had I never thought about it like that
                        before?". There was never a moment where I disagreed with your opinion.
                    </p>

                    <p>
                        When you meet someone like that, you naturally want to share your own thoughts with them too.
                        And with you, I never felt judged for doing that.
                        I genuinely started to like myself more when I was with you,
                        because it just felt like I was truly being myself.
                        Like I had finally found a version of myself that I actually
                        felt comfortable being, and somehow, that version of me only seemed
                        to come out when I was with you.
                    </p>
                </div>
            </div>

            <div class="song-item">
                <img
                    class="song-cover"
                    src="images/what-if.jpg"
                    data-album="images/what-if.jpg"
                    data-lyrics="images/what-if-lyrics.jpeg"
                    onclick="toggleSongImage(this)"
                    alt="What If album cover"
                >

                <div class="song-content">
                    <h3>05 — What If</h3>

                    <p>
                        And then you told me you liked me. I was SO confused
                        because I genuinely thought you liked someone else
                        and only saw me as a good friend. But looking back,
                        you really did give me a lot of clues, so I have
                        no idea why I didn't see it.
                    </p>

                    <p>
                        Since I had just gotten out of a relationship,
                        I wasn't really sure what I wanted at all.
                        I never imagined us actually being together.
                        Like yea, we had this really good connection, but
                        I always imagined that we would just stay friends.
                    </p>

                    <p>
                        But then I started thinking about it more.
                        What if I just went for it? What if this ended up
                        being the best thing I'd ever done?
                        What if I'll never feel this way again for anyone?
                        What if with you, I would finally get to experience
                        what love is actually supposed to feel like?
                    </p>
                </div>
            </div>

            <div class="song-item">
                <img
                    class="song-cover"
                    src="images/drop-dead.jpeg"
                    data-album="images/drop-dead.jpeg"
                    data-lyrics="images/drop-dead-lyrics.jpeg"
                    onclick="toggleSongImage(this)"
                    alt="Drop Dead album cover"
                >

                <div class="song-content">
                    <h3>06 — Drop Dead</h3>

                    <p>
                        When Drop Dead by Olivia Rodrigo came out,
                        I kept listening to it over and over. She never wrote
                        love songs, except for So American, but I could never
                        relate to that song.
                    </p>

                    <p>
                        I thought I just liked sad songs. But for some reason,
                        I really liked Drop Dead. It made me think of you.
                    </p>

                    <p>
                        I think that's when I realised I didn't see you
                        just as a friend anymore.
                    </p>
                </div>
            </div>

            <div class="song-item">
                <img
                    class="song-cover"
                    src="images/risk.jpg"
                    data-album="images/risk.jpg"
                    data-lyrics="images/risk-lyrics.jpeg"
                    onclick="toggleSongImage(this)"
                    alt="Risk album cover"
                >

                <div class="song-content">
                    <h3>07 — Risk</h3>

                    <p>
                        Eventually, I decided to take the risk. I didn't have
                        everything figured out. I was still scared and unsure,
                        and I still had trust issues and insecurities
                        from past relationships.
                    </p>

                    <p>
                        The best thing for me probably would have been to not
                        talk to any guys and just focus on myself. But you
                        weren't just any guy.
                    </p>

                    <p>
                        There was no one else I would have wanted to take that risk
                        for more than you. It felt like it was worth it.
                    </p>
                </div>
            </div>

            <div class="song-item">
                <img
                    class="song-cover"
                    src="images/kiss-me.png"
                    data-album="images/kiss-me.png"
                    data-lyrics="images/kiss-me-lyrics.jpeg"
                    onclick="toggleSongImage(this)"
                    alt="Kiss Me album cover"
                >

                <div class="song-content">
                    <h3>08 — Kiss Me</h3>

                    <p>
                        So I told you I liked you too. And honestly,
                        I loved it. I was so happy during that time.
                        I had never really experienced that kind of happiness
                        before, just being happy without constantly
                        worrying about something.
                    </p>

                    <p>
                        Everything you said, every little thing you laughed about,
                        I just loved it. It all felt so natural. It just felt right.
                        I wasn't thinking about how deep everything was yet.
                        I just knew that I liked you, and I really wanted
                        to enjoy that moment.
                    </p>
                </div>
            </div>

            <div class="song-item">
                <img
                    class="song-cover"
                    src="images/how-deep-is-your-love.jpg"
                    data-album="images/how-deep-is-your-love.jpg"
                    data-lyrics="images/how-deep-is-your-love-lyrics.jpeg"
                    onclick="toggleSongImage(this)"
                    alt="How Deep Is Your Love album cover"
                >

                <div class="song-content">
                    <h3>09 — How Deep Is Your Love</h3>

                    <p>
                        I think around this period, I started to understand
                        just how deep my feelings for you had become.
                    </p>

                    <p>
                        But I also started thinking about how deep your feelings
                        were for me. For me, it almost felt unreal. We hadn't
                        even met yet, but it felt like we had known each other
                        for such a long time.
                    </p>

                    <p>
                        Because this feeling I have, how much I care about you,
                        is something I usually only feel when I've known someone
                        for a really long time.
                    </p>
                </div>
            </div>

            <div class="song-item">
                <img
                    class="song-cover"
                    src="images/venus.jpg"
                    data-album="images/venus.jpg"
                    data-lyrics="images/venus-lyrics.jpeg"
                    onclick="toggleSongImage(this)"
                    alt="Venus album cover"
                >

                <div class="song-content">
                    <h3>10 — Venus</h3>

                    <p>
                        So here we are, and honestly, I love where we are now.
                        Venus is definitely my number one song when I think about you.
                        It sounds like the kind of love we have right now.
                        It's sweet, warm, and just lovely.
                    </p>

                    <p>
                        Every time I listen to this song, it kind of reminds me of how much I like you.
                        From joining a voice call as complete strangers to becoming such a big part of my life.
                        I really appreciate you, even though I don't always say it. But I hope that whenever you
                        listen to this song, you can think of it as all the things I want to tell you but
                        don't always know how to say.
                    </p>
                </div>
            </div>
        </div>
    `;
}

function toggleSongImage(image) {
    const albumImage = image.dataset.album;
    const lyricsImage = image.dataset.lyrics;

    if (image.dataset.showing === "lyrics") {
        image.src = albumImage;
        image.dataset.showing = "album";
        image.alt = "Album cover";
    } else {
        image.src = lyricsImage;
        image.dataset.showing = "lyrics";
        image.alt = "Lyrics screenshot";
    }
}
