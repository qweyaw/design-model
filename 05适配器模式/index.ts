/* 
   适配器模式:
    作为两个不兼容的接口之间的桥梁。这种类型的设计模式属于结构型模式，它结合了两个独立接口的功能

    优点： 
      1、可以让任何两个没有关联的类一起运行。 
      2、提高了类的复用。
      3、增加了类的透明度。 
      4、灵活性好。

    缺点： 
      1、过多地使用适配器，会让系统非常零乱，不易整体进行把握。
        比如，明明看到调用的是 A 接口，其实内部被适配成了 B 接口的实现，一个系统如果太多出现这种情况，无异于一场灾难。
        因此如果不是很有必要，可以不使用适配器，而是直接对系统进行重构。 
      2.由于 JAVA 至多继承一个类，所以至多只能适配一个适配者类，而且目标类必须是抽象类。
*/

/* 
  实现:
    有一个 MediaPlayer 接口和一个实现了 MediaPlayer 接口的实体类 AudioPlayer。
    默认情况下，AudioPlayer 可以播放 mp3 格式的音频文件。
    还有另一个接口 AdvancedMediaPlayer 和实现了 AdvancedMediaPlayer 接口的实体类。该类可以播放 vlc 和 mp4 格式的文件。
    我们想要让 AudioPlayer 播放其他格式的音频文件。
    为了实现这个功能，我们需要创建一个实现了 MediaPlayer 接口的适配器类 MediaAdapter，并使用 AdvancedMediaPlayer 对象来播放所需的格式。
    AudioPlayer 使用适配器类 MediaAdapter 传递所需的音频类型，不需要知道能播放所需格式音频的实际类。
    AdapterPatternDemo 类使用 AudioPlayer 类来播放各种格式。
*/

// 1. 创建接口
interface MediaPlayer {
  play: (audioType: string, filename: string) => void;
}

interface AdvancedMediaPlayer {
  playVlc: (filename: string) => void;
  playMp4: (filename: string) => void;
}

// 2. 创建 AdvancedMediaPlayer 实体类
class VlcPlayer implements AdvancedMediaPlayer {
  public playVlc(filename: string) {
    console.log("Playing vlc file. Name: " + filename);
  }

  public playMp4(filename: string) {}
}

class Mp4Player implements AdvancedMediaPlayer {
  public playMp4(filename: string) {
    console.log("Playing mp4 file. Name: " + filename);
  }

  public playVlc(filename: string) {}
}

// 3. 创建实现 MediaPlayer 接口的适配器类
class MediaAdapter implements MediaPlayer {
  public advancedMusicPlayer: AdvancedMediaPlayer;
  constructor() {
    this.advancedMusicPlayer = new VlcPlayer();
  }
  public MediaAdapter(audioType: string) {
    if (audioType === "vlc") {
      this.advancedMusicPlayer = new VlcPlayer();
    } else if (audioType === "mp4") {
      this.advancedMusicPlayer = new Mp4Player();
    }
  }

  public play(audioType: string, filename: string) {
    if (audioType === "vlc") {
      this.advancedMusicPlayer.playVlc(filename);
    } else if (audioType === "mp4") {
      this.advancedMusicPlayer.playMp4(filename);
    }
  }
}

// 4. 创建实现 MediaPlayer 接口的实体类
class AudioPlayer implements MediaPlayer {
  public mediaAdapter: MediaAdapter;
  constructor() {
    this.mediaAdapter = new MediaAdapter();
  }
  public play(audioType: string, filename: string) {
    if (audioType === "mp3") {
      console.log("Playing mp3 file. Name: " + filename);
    } else if (audioType === "vlc" || audioType === "mp4") {
      this.mediaAdapter.MediaAdapter(audioType);
      this.mediaAdapter.play(audioType, filename);
    } else {
      console.log("Invalid media. " + audioType + " format not supported");
    }
  }
}

// 5. 使用 audioPayer 播放不同的音乐
function AdapterPatternDemo() {
  const audioPlayer: AudioPlayer = new AudioPlayer();

  audioPlayer.play("mp3", "beyond the horizon.mp3");
  audioPlayer.play("mp4", "alone.mp4");
  audioPlayer.play("vlc", "far far away.vlc");
  audioPlayer.play("avi", "mind me.avi");
}
AdapterPatternDemo();
/* 
  Playing mp3 file. Name: beyond the horizon.mp3
  Playing mp4 file. Name: alone.mp4
  Playing vlc file. Name: far far away.vlc
  Invalid media. avi format not supported
*/
