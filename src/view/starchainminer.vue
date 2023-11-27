<template>

<div class="content-wrapper5">
    <div class="content-wrappert">
		<div class="content-wrapperto">
		<img src="../starchainminer/static/image/bg-middle1.jpg">
			<section class="wrapper5" style="margin-top: -600px;">
				<div class="container py-14 pt-md-15 pb-md-18 pb-20">
					<div class="row text-center">
						<div class="col-lg-9 col-xxl-7 mx-auto" data-cues="zoomIn" data-group="welcome" data-interval="-200">
							<h1 class="display-1 fs-58 text-white text-shadow">{{$t('bico.W281')}}</h1>
							<h2 class="fs-16 text-uppercase ls-xl sub-head">{{$t('bico.W282')}}</h2>
							<p class="lead px-md-5 px-xl-15 px-xxl-10 mb-7 text-white text-shadow">{{$t('bico.W283')}}</p>
						</div>
					</div>
					<div class="d-flex justify-content-center" data-cues="slideInDown" data-group="join" data-delay="900">
						<span>
							<a class="btn btn-lg btn-primary rounded-pill mx-1" href="/#/mstarch">{{$t('bico.W284')}}</a>
						</span>
						<span>
							<a class="btn btn-lg btn-outline-primary rounded-pill mx-1 text-white" href="javascript:;">{{$t('bico.W285')}}</a>
						</span>
					</div>
				</div>
			</section>
		</div>
	    <!-- 视频动画 -->

	<section class="wrapper5 bg-dark" id="about">
		<div class="container">
			<div class="row gx-lg-0 gy-10 align-items-center">
				<div class="col-lg-5 offset-lg-1">
					<h2 class="display-4 mb-3 text-white">{{$t('bico.W286')}}</h2>
					<p class="lead fs-lg lh-sm sub-head">{{$t('bico.W287')}}</p>
					<p class="text-white">{{$t('bico.W288')}}</p>
					<p class="text-white">{{$t('bico.W289')}}</p>
				</div>
			</div>
		</div>
	</section>

  <!-- 模拟加入视频动画科技感 -->

	<section class="wrapper5" id="eco">
	<img src="../starchainminer/static/image/bg-stars.jpg">
		<div class="container py-8 py-md-10" style="margin-top: -1360px;">
			<div class="row gx-lg-8 pt-16 gx-xl-12 gy-10 mb-14 mb-md-17 align-items-center">
				<div class="col-lg-6 position-relative order-lg-2">
					<div class="col-lg-6 position-relative order-lg-2 video-container order-2">
						<video width="1080" height="1080" playsinline="" autoplay="" muted="" loop="">
							<source src="@/starchainminer/static/videos/video_2022-05-29_12-29-40.mp4" type="video/mp4">
							Your browser does not support the video tag.
						</video>
					</div>
				</div>

				<div class="col-lg-6">
					<h2 class="fs-15 text-uppercase text-line text-primary mb-3 sub-head">{{$t('bico.W290')}}</h2>
					<h3 class="display-5 mb-7 text-white">{{$t('bico.W291')}}</h3>
					<p class="lead fs-lg text-white">{{$t('bico.W292')}}</p>
					<p class="mb-6 text-white">{{$t('bico.W293')}} </p>
					<div class="row gy-3 gx-xl-8">
						<div class="col-xl-6">
							<ul class="icon-list bullet-bg bullet-soft-primary mb-0">
								<li>
									<span>
										<i class="uil uil-coins"></i>
									</span>
									<span class="text-white-50">
										<h4 class="text-white">{{$t('bico.W294')}}</h4>{{$t('bico.W295')}} 
									</span>
								</li>
								<li class="mt-3">
									<span>
										<i class="uil uil-puzzle-piece"></i>
									</span>
									<span class="text-white-50">
										<h4 class="text-white">SATE NFTs</h4>{{$t('bico.W296')}}
									</span>
								</li>
								<li class="mt-3">
									<span>
										<i class="uil uil-star"></i>
									</span>
									<span class="text-white-50">
										<h4 class="text-white">{{$t('bico.W297')}}</h4>{{$t('bico.W298')}}
									</span>
								</li>
							</ul>
						</div>

						<div class="col-xl-6">
							<ul class="icon-list bullet-bg bullet-soft-primary mb-0">
								<li>
									<span>
										<i class="uil uil-users-alt"></i>
									</span>
									<span class="text-white-50">
										<h4 class="text-white">{{$t('bico.W299')}}</h4>{{$t('bico.W302')}}
									</span>
								</li>
								<li class="mt-3">
									<span>
										<i class="uil uil-money-insert"></i>
									</span>
									<span class="text-white-50">
										<h4 class="text-white">{{$t('bico.W300')}} DAO</h4>{{$t('bico.W301')}}
									</span>
								</li>
								<li class="mt-3">
									<span>
										<i class="uil uil-cart"></i>
									</span>
									<span class="text-white-50">
										<h4 class="text-white">{{$t('bico.W303')}}</h4>{{$t('bico.W304')}}
									</span>
								</li>
							</ul>
						</div>

					</div>
				</div>

			</div>

		</div>
	</section>
	</div>
<Foot />

</div>
    

</template>

<script>
import Foot from '@/components/Foot'

import "@/starchainminer/static/css/purple.css";

export default {

    data(){
        return{
          
        }
    },

    created(){
      
    },

    methods:{
      
    },

    components: {
			    
		 Foot,
		},

}
</script>

<style lang="less" scoped>


.stars-bg {
    background: #21153b url() top center no-repeat;
    background-size: 100%;
}

.navbar-dark .navbar-brand img {
    width: 50%;
}

.display-1 {
    font-family: 'archery_black_roundedregular';
    font-size: 6rem!important;
    text-transform: uppercase;
    font-weight: normal!important;
}

.hero-banner {
    
    padding-top:30%!important;
}

video {mix-blend-mode:screen;}

.bg-dark {
    background-color: #21153b00 !important;
}

.sub-head {
    color: #FFAE1E!important;
}

.text-shadow {
    text-shadow: 1px 1px 3px #372677;
}

.icon-list.bullet-soft-primary.bullet-bg .completed {
    text-decoration: line-through;
}

.icon-list.bullet-soft-primary.bullet-bg .completed i {
    background-color: green!important;
    color: white!important;
}

.intro {color: #fff!important; display: block; margin-bottom: 0;}
.intro:before, .intro:after{
    position: absolute;
    top: 51%;
    overflow: hidden;
    width: 10%;
    height: 1px;
    left: 35%;
    content: '\a0';
    background-color:rgba(255, 255, 255, 0.4);
}
.intro:after {
    left: auto;
    right: 35%;
    text-align: right;
    
}
.wrapper5{
	background-color: #21153d;
}
.col-lg-6 {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    width: 24%;
}

.col-lg-5 {
        flex: 0 0 auto;
        width: 100%
}

.col-xxl-7 {
        flex: 0 0 auto;
        width: 100%
}

.col-xl-6 {
        flex: 0 0 auto;
        width: 100%
}

a{
    text-decoration: none;
    color: #ffffff;
}

</style>
