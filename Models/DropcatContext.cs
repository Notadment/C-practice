using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DropCats.Models;

public partial class DropcatContext : DbContext
{
    public DropcatContext()
    {
    }

    public DropcatContext(DbContextOptions<DropcatContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Blacklist> Blacklists { get; set; }

    public virtual DbSet<ChattingHistory> ChattingHistories { get; set; }

    public virtual DbSet<CollectionPost> CollectionPosts { get; set; }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<Exploretest> Exploretests { get; set; }

    public virtual DbSet<FanList> FanLists { get; set; }

    public virtual DbSet<FollowInformation> FollowInformations { get; set; }

    public virtual DbSet<FollowingList> FollowingLists { get; set; }

    public virtual DbSet<Information> Information { get; set; }

    public virtual DbSet<Like> Likes { get; set; }

    public virtual DbSet<Post> Posts { get; set; }

    public virtual DbSet<PostImg> PostImgs { get; set; }

    public virtual DbSet<PostType> PostTypes { get; set; }

    public virtual DbSet<SettingInform> SettingInforms { get; set; }

    public virtual DbSet<SurfingHistory> SurfingHistories { get; set; }

    public virtual DbSet<TellYouHaveLike> TellYouHaveLikes { get; set; }

    public virtual DbSet<TypeKey> TypeKeys { get; set; }

    public virtual DbSet<UserInfo> UserInfos { get; set; }

    public virtual DbSet<UserPreferType> UserPreferTypes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("data source=dropcatasia.c10mg2ikizc4.ap-northeast-3.rds.amazonaws.com;database=Dropcat;user id=admin;password=Dropcat666", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.35-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Blacklist>(entity =>
        {
            entity.HasKey(e => e.BlacklistId).HasName("PRIMARY");

            entity.ToTable("Blacklist");

            entity.HasIndex(e => e.BlockerId, "Blacklist_blockerID_index");

            entity.HasIndex(e => e.BlockedUserId, "blockedUserIDuseridIndex");

            entity.Property(e => e.BlacklistId).HasColumnName("blacklistID");
            entity.Property(e => e.BlockTime)
                .HasColumnType("datetime")
                .HasColumnName("blockTime");
            entity.Property(e => e.BlockedUserId).HasColumnName("blockedUserID");
            entity.Property(e => e.BlockerId).HasColumnName("blockerID");
        });

        modelBuilder.Entity<ChattingHistory>(entity =>
        {
            entity.HasKey(e => e.ChattingHistoryId).HasName("PRIMARY");

            entity.ToTable("ChattingHistory");

            entity.HasIndex(e => new { e.ReceiverId, e.SenderId }, "ChattingHistory_senderID_receiverID");

            entity.Property(e => e.ChattingHistoryId).HasColumnName("ChattingHistoryID");
            entity.Property(e => e.ChattingTime)
                .HasColumnType("datetime")
                .HasColumnName("chattingTime");
            entity.Property(e => e.Messages)
                .HasMaxLength(1000)
                .HasColumnName("messages");
            entity.Property(e => e.ReceiverId).HasColumnName("receiverID");
            entity.Property(e => e.SenderId).HasColumnName("senderID");
        });

        modelBuilder.Entity<CollectionPost>(entity =>
        {
            entity.HasKey(e => e.CollectionPostId).HasName("PRIMARY");

            entity.ToTable("CollectionPost");

            entity.HasIndex(e => new { e.PostId, e.UserId }, "collectpost_postID_userID");

            entity.HasIndex(e => new { e.PostId, e.UserId, e.CollectTime }, "collectpost_postID_userID_collecttime");

            entity.Property(e => e.CollectionPostId).HasColumnName("collectionPostID");
            entity.Property(e => e.CollectTime)
                .HasColumnType("datetime")
                .HasColumnName("collectTime");
            entity.Property(e => e.CollectorId).HasColumnName("collectorID");
            entity.Property(e => e.PostId).HasColumnName("postID");
            entity.Property(e => e.UserId).HasColumnName("userID");
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.CommentId).HasName("PRIMARY");

            entity.HasIndex(e => e.PostContextId, "CommentsIndex");

            entity.Property(e => e.CommentId).HasColumnName("commentId");
            entity.Property(e => e.CommentTime)
                .HasColumnType("datetime")
                .HasColumnName("commentTime");
            entity.Property(e => e.Comments)
                .HasMaxLength(5000)
                .HasColumnName("comments");
            entity.Property(e => e.PostContextId).HasColumnName("postContextId");
            entity.Property(e => e.UserId).HasColumnName("userId");
        });

        modelBuilder.Entity<Exploretest>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("exploretest");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Img)
                .HasMaxLength(255)
                .HasColumnName("img");
            entity.Property(e => e.Likes).HasColumnName("likes");
            entity.Property(e => e.Message).HasColumnName("message");
        });

        modelBuilder.Entity<FanList>(entity =>
        {
            entity.HasKey(e => e.FanListId).HasName("PRIMARY");

            entity.ToTable("FanList");

            entity.Property(e => e.FanListId).HasColumnName("FanListID");
            entity.Property(e => e.FanId).HasColumnName("fanID");
            entity.Property(e => e.FollowTime)
                .HasColumnType("datetime")
                .HasColumnName("followTime");
            entity.Property(e => e.UserId).HasColumnName("userID");
        });

        modelBuilder.Entity<FollowInformation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("FollowInformation");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.FansFollowTime)
                .HasColumnType("datetime")
                .HasColumnName("fansFollowTime");
            entity.Property(e => e.FansIcon)
                .HasMaxLength(1000)
                .HasDefaultValueSql("'https://myjavatest20231207.s3.ap-northeast-3.amazonaws.com/defaultuser.png'")
                .HasColumnName("fansIcon");
            entity.Property(e => e.FansId).HasColumnName("fansId");
            entity.Property(e => e.FansUserAccount)
                .HasMaxLength(20)
                .HasColumnName("fansUserAccount");
            entity.Property(e => e.FollowedUserId).HasColumnName("followedUserId");
        });

        modelBuilder.Entity<FollowingList>(entity =>
        {
            entity.HasKey(e => e.FollowingListId).HasName("PRIMARY");

            entity.ToTable("FollowingList");

            entity.HasIndex(e => new { e.UserId, e.FollowingUserId }, "FollowingListuseridandfollowingUserIDIndex");

            entity.Property(e => e.FollowingListId).HasColumnName("followingListID");
            entity.Property(e => e.FollowTime)
                .HasColumnType("datetime")
                .HasColumnName("followTime");
            entity.Property(e => e.FollowingUserId).HasColumnName("followingUserID");
            entity.Property(e => e.UserId).HasColumnName("userID");
        });

        modelBuilder.Entity<Information>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.HasIndex(e => new { e.OthersUserId, e.UserId }, "Info_index");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.OthersUserId).HasColumnName("othersUserID");
            entity.Property(e => e.PostId).HasColumnName("postId");
            entity.Property(e => e.PostSettingTime)
                .HasColumnType("datetime")
                .HasColumnName("postSettingTime");
            entity.Property(e => e.PostType)
                .HasMaxLength(20)
                .HasColumnName("postType");
            entity.Property(e => e.UserAccount)
                .HasMaxLength(20)
                .HasColumnName("userAccount");
            entity.Property(e => e.UserId).HasColumnName("userId");
            entity.Property(e => e.Usericon)
                .HasMaxLength(1000)
                .HasDefaultValueSql("'https://myjavatest20231207.s3.ap-northeast-3.amazonaws.com/defaultuser.png'")
                .HasColumnName("usericon");
        });

        modelBuilder.Entity<Like>(entity =>
        {
            entity.HasKey(e => e.LikeId).HasName("PRIMARY");

            entity.HasIndex(e => e.PostContextId, "LikesIndex");

            entity.HasIndex(e => new { e.PostContextId, e.UserLikedId }, "onePostoneLike").IsUnique();

            entity.Property(e => e.LikeId).HasColumnName("likeId");
            entity.Property(e => e.LikeTime)
                .HasColumnType("datetime")
                .HasColumnName("likeTime");
            entity.Property(e => e.PostContextId).HasColumnName("postContextId");
            entity.Property(e => e.UserLikedId).HasColumnName("userLikedId");
        });

        modelBuilder.Entity<Post>(entity =>
        {
            entity.HasKey(e => e.PostId).HasName("PRIMARY");

            entity.ToTable("Post");

            entity.HasIndex(e => new { e.PostId, e.Createtime, e.PostType }, "Post_createtime_postType");

            entity.HasIndex(e => new { e.PostId, e.Lat, e.Lng, e.Createtime, e.UserId }, "Post_lat_lng_createtime_userId");

            entity.HasIndex(e => e.UserId, "post_userid");

            entity.Property(e => e.PostId).HasColumnName("postId");
            entity.Property(e => e.Createtime)
                .HasColumnType("datetime")
                .HasColumnName("createtime");
            entity.Property(e => e.Edittime)
                .HasColumnType("datetime")
                .HasColumnName("edittime");
            entity.Property(e => e.Lat)
                .HasPrecision(7, 5)
                .HasColumnName("lat");
            entity.Property(e => e.Lng)
                .HasPrecision(8, 5)
                .HasColumnName("lng");
            entity.Property(e => e.PostType).HasColumnName("postType");
            entity.Property(e => e.Posttext)
                .HasMaxLength(2000)
                .HasColumnName("posttext");
            entity.Property(e => e.UserId).HasColumnName("userId");
        });

        modelBuilder.Entity<PostImg>(entity =>
        {
            entity.HasKey(e => e.ImgId).HasName("PRIMARY");

            entity.ToTable("PostImg");

            entity.HasIndex(e => e.PostId, "POSTIMG_INDEX");

            entity.HasIndex(e => e.ImgSerial, "PostImg_postID_imgSerial");

            entity.Property(e => e.ImgId).HasColumnName("imgId");
            entity.Property(e => e.ImgSerial).HasColumnName("imgSerial");
            entity.Property(e => e.ImgUrl)
                .HasMaxLength(2000)
                .HasColumnName("imgURL");
            entity.Property(e => e.PostId).HasColumnName("postId");
        });

        modelBuilder.Entity<PostType>(entity =>
        {
            entity.HasKey(e => e.TypeId).HasName("PRIMARY");

            entity.ToTable("postTypes");

            entity.Property(e => e.TypeId).HasColumnName("typeId");
            entity.Property(e => e.TypeName)
                .HasMaxLength(5)
                .HasColumnName("typeName");
        });

        modelBuilder.Entity<SettingInform>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("SettingInform");

            entity.HasIndex(e => e.UserId, "Setting_userid_index");

            entity.HasIndex(e => e.UserAccount, "userAccount").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.FollowInformState)
                .HasDefaultValueSql("'1'")
                .HasColumnName("followInformState");
            entity.Property(e => e.Gender)
                .HasMaxLength(20)
                .HasColumnName("gender");
            entity.Property(e => e.LikeInformState)
                .HasDefaultValueSql("'1'")
                .HasColumnName("likeInformState");
            entity.Property(e => e.OpenState)
                .HasDefaultValueSql("'1'")
                .HasColumnName("openState");
            entity.Property(e => e.PostInformState)
                .HasDefaultValueSql("'1'")
                .HasColumnName("postInformState");
            entity.Property(e => e.SettingInformationTime)
                .HasColumnType("datetime")
                .HasColumnName("settingInformationTime");
            entity.Property(e => e.UserAccount)
                .HasMaxLength(20)
                .HasColumnName("userAccount");
            entity.Property(e => e.UserId).HasColumnName("userId");
        });

        modelBuilder.Entity<SurfingHistory>(entity =>
        {
            entity.HasKey(e => e.SurfingHistoryId).HasName("PRIMARY");

            entity.ToTable("SurfingHistory");

            entity.HasIndex(e => new { e.PostId, e.SurfingUserId, e.SurfingTime }, "collectpost_postID_surfingUserID_surfingTime");

            entity.Property(e => e.SurfingHistoryId).HasColumnName("surfingHistoryID");
            entity.Property(e => e.PostId).HasColumnName("postID");
            entity.Property(e => e.SurfingTime)
                .HasColumnType("datetime")
                .HasColumnName("surfingTime");
            entity.Property(e => e.SurfingUserId).HasColumnName("surfingUserID");
        });

        modelBuilder.Entity<TellYouHaveLike>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("tellYouHaveLike");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreateTime)
                .HasColumnType("datetime")
                .HasColumnName("create_Time");
            entity.Property(e => e.GiveYouLikePostId).HasColumnName("give_You_Like_PostId");
            entity.Property(e => e.GiveYouLikeUserAccount)
                .HasMaxLength(20)
                .HasColumnName("give_You_Like_userAccount");
            entity.Property(e => e.GiveYouLikeUserId).HasColumnName("give_You_Like_UserId");
            entity.Property(e => e.GiveYouLikeUsericon)
                .HasMaxLength(1000)
                .HasDefaultValueSql("'https://myjavatest20231207.s3.ap-northeast-3.amazonaws.com/defaultuser.png'")
                .HasColumnName("give_You_Like_Usericon");
            entity.Property(e => e.GivelikePostId).HasColumnName("givelike_PostId");
            entity.Property(e => e.GivelikeUserId).HasColumnName("givelike_UserId");
            entity.Property(e => e.LikeTime)
                .HasColumnType("datetime")
                .HasColumnName("like_Time");
            entity.Property(e => e.PostType).HasColumnName("postType");
            entity.Property(e => e.PostUserId).HasColumnName("post_userId");
        });

        modelBuilder.Entity<TypeKey>(entity =>
        {
            entity.HasKey(e => e.TypeKeyId).HasName("PRIMARY");

            entity.ToTable("typeKeys");

            entity.Property(e => e.TypeKeyId).HasColumnName("typeKeyId");
            entity.Property(e => e.TypeId).HasColumnName("typeId");
            entity.Property(e => e.Typekey1)
                .HasMaxLength(5)
                .HasColumnName("typekey");
        });

        modelBuilder.Entity<UserInfo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("UserInfo");

            entity.HasIndex(e => e.Email, "email").IsUnique();

            entity.HasIndex(e => e.Phonenumber, "phonenumber").IsUnique();

            entity.HasIndex(e => e.UserAccount, "userAccount").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Createtime)
                .HasColumnType("datetime")
                .HasColumnName("createtime");
            entity.Property(e => e.Edittime)
                .HasColumnType("datetime")
                .HasColumnName("edittime");
            entity.Property(e => e.Email)
                .HasMaxLength(200)
                .HasColumnName("email");
            entity.Property(e => e.Gender).HasColumnName("gender");
            entity.Property(e => e.Introduction)
                .HasMaxLength(150)
                .HasColumnName("introduction");
            entity.Property(e => e.Lineid)
                .HasMaxLength(20)
                .HasColumnName("lineid");
            entity.Property(e => e.Lineprofile)
                .HasMaxLength(1000)
                .HasColumnName("lineprofile");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.Phonenumber)
                .HasMaxLength(20)
                .HasColumnName("phonenumber");
            entity.Property(e => e.ResetToken)
                .HasMaxLength(255)
                .HasColumnName("resetToken");
            entity.Property(e => e.TokenTime)
                .HasColumnType("datetime")
                .HasColumnName("tokenTime");
            entity.Property(e => e.UserAccount)
                .HasMaxLength(20)
                .HasColumnName("userAccount");
            entity.Property(e => e.Usericon)
                .HasMaxLength(1000)
                .HasDefaultValueSql("'https://myjavatest20231207.s3.ap-northeast-3.amazonaws.com/defaultuser.png'")
                .HasColumnName("usericon");
            entity.Property(e => e.Username)
                .HasMaxLength(20)
                .HasColumnName("username");
        });

        modelBuilder.Entity<UserPreferType>(entity =>
        {
            entity.HasKey(e => e.UserPreferTypesId).HasName("PRIMARY");

            entity.HasIndex(e => new { e.TypeId, e.Score, e.UserId }, "UserPreferTypes_userId_typeId_score");

            entity.HasIndex(e => new { e.TypeId, e.UserId }, "unq_UserPreferTypes_index").IsUnique();

            entity.Property(e => e.UserPreferTypesId).HasColumnName("userPreferTypesId");
            entity.Property(e => e.Score).HasColumnName("score");
            entity.Property(e => e.TypeId)
                .HasDefaultValueSql("'0'")
                .HasColumnName("typeId");
            entity.Property(e => e.UserId).HasColumnName("userId");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
