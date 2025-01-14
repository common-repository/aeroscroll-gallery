const {
    ref,
    watch,
    onMounted,
    onBeforeUpdate
} = Vue;
export default {
    template: `
        <div class="social-share">
            <a v-if="social_share_facebook === 1 || social_share_facebook === '1'" class="fb-h" :href="GetFacebookLink()" target="_blank" rel="noopener" style="font-size: 1.125rem; text-align: center;">
            <img :src="get_social_image_url('icons8-facebook-48.png')">
            </a>
            <a v-if="social_share_twitter === 1 || social_share_twitter === '1'" class="tw-h" @click="social_twitter_click(title, description, image, type)" target="_blank">
                <img :src="get_social_image_url('icons8-twitter-48.png')">
            </a>
            <a v-if="social_share_pinterest === 1 || social_share_pinterest === '1'" data-pin-do="buttonPin" data-pin-config="none" class="pi-h" @click="social_pinterest_click(title, description, image, type)" target="_blank">
                <img :src="get_social_image_url('icons8-pinterest-48.png')">
            </a>
            <a v-if="social_share_tumblr === 1 || social_share_tumblr === '1'" class="tu-h" @click="social_tumblr_click(title, description, image, type)" target="_blank">
                <img :src="get_social_image_url('icons8-tumblr-48.png')">
            </a>
            <a v-if="social_share_email === 1 || social_share_email === '1'" class="em-h" :href="'mailto:?subject='+title+'&body='+GetEmailBody()" class="social-share-button social-share-button-email" target="_blank" rel="nofollow noopener noreferrer" aria-label="Share via Email" title="Share via Email" @click="social_email_click(title, description, image, type)">
                <img :src="get_social_image_url('icons8-email-48.png')">    
            </a>
        </div>        
    `,
    name: "SharePanel",
    props: {
        title: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: ""
        },
        image: {
            type: String,
            default: ""
        },
        social_share_facebook: {
            type: Number,
            default: 0
        },
        social_share_twitter: {
            type: Number,
            default: 0
        },
        social_share_pinterest: {
            type: Number,
            default: 0
        },
        social_share_instagram: {
            type: Number,
            default: 0
        },
        social_share_tumblr: {
            type: Number,
            default: 0
        },
        social_share_email: {
            type: Number,
            default: 0
        }
    },
    components: {},
    setup(props, context) {
        function GetFacebookLink() {
            var _link = "http://www.facebook.com/share.php?u=";

            if (props.type === 'imagegallery') {
                _link += props.image;
            } else {
                var urlToShare = window.location.href;
                _link += encodeURIComponent(urlToShare);
            }

            return _link;
        }

        function social_facebook_click(_title, _desc, _image, _type) {
            this.share_link = window.location.href;
            this.share_title = "";
            this.share_description = "";

            if (_title !== null && typeof _title !== 'undefined') this.share_title = _title;
            if (_desc !== null && typeof _desc !== 'undefined') this.share_description = _desc;

            if (_type === 'imagegallery') {
                // URL of the page you want to share
                var urlToShare = window.location.href;

                // Open Facebook share dialog
                window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(urlToShare), 'facebook-share-dialog', 'width=626,height=436');
                //window.open(`http://www.facebook.com/sharer.php?u=${this.share_link}&quote=${this.share_title}`, "sharer", "toolbar=0,status=0,width=626,height=436");
            } else {
                window.open(`http://www.facebook.com/sharer.php?u=${this.share_link}&quote=${this.share_title}`, "sharer", "toolbar=0,status=0,width=626,height=436");
            }

            return false;
        }

        function social_twitter_click(_title, _desc, _image, _type) {
            this.share_link = window.location.href;
            this.share_title = "";

            if (_title !== null && typeof _title !== 'undefined') this.share_title = _title;

            if (_type === 'imagegallery') {
                window.open(`https://twitter.com/intent/tweet?text=${this.share_title}&url=${_image}`, 'sharer', 'toolbar=0,status=0,width=626,height=436');
            } else {
                window.open(`https://twitter.com/intent/tweet?text=${this.share_title}&url=${this.share_title}`, 'sharer', 'toolbar=0,status=0,width=626,height=436');
            }


            return false;
        }

        function social_pinterest_click(_title, _desc, _social_image, _type) {
            this.share_link = window.location.href;
            this.share_title = "";
            this.share_description = "";

            if (_title !== null && typeof _title !== 'undefined') this.share_title = _title;
            if (_desc !== null && typeof _desc !== 'undefined') this.share_description = _desc;

            var imageUrl = "/wp-content/plugins/aeroscroll-gallery/public/images/" + _social_image;

            window.open(`https://www.pinterest.com/pin/create/button/?&text=${this.share_title}&url=${imageUrl}&description=${this.share_description}`, 'sharer', 'toolbar=0,status=0,width=626,height=436');
            return false;
        }

        function social_instagram_click(_title, _desc, _image, _type) {
            this.share_link = window.location.href;
            this.share_title = "";

            if (_title !== null && typeof _title !== 'undefined') this.share_title = _title;

            window.open(`https://www.instagram.com/p/${_image}`, "sharer", "toolbar=0,status=0,width=626,height=436");
            return false;
        }

        function social_tumblr_click(_title, _desc, _image, _type) {
            this.share_link = window.location.href;
            this.share_title = "";

            if (_title !== null && typeof _title !== 'undefined') this.share_title = _title;

            window.open(`https://www.tumblr.com/share/link?url=${this.share_link}`, "sharer", "toolbar=0,status=0,width=626,height=436");
            return false;
        }

        function social_email_click(_title, _desc, _image, _type) {
            this.share_link = window.location.href;
            this.share_title = "";
            this.share_description = "";

            if (_title !== null && typeof _title !== 'undefined') this.share_title = _title;
            if (_desc !== null && typeof _desc !== 'undefined') this.share_description = _desc;

            return false;
        }

        function get_social_image_url(_social_image) {
            var baseUrl = window["BASE_URL"];
            return baseUrl + "/wp-content/plugins/aeroscroll-gallery/public/images/" + _social_image;
        }

        function GetEmailBody() {
            this.share_link = window.location.href;
            return this.share_link;
        }

        onMounted(() => {

        });

        return {
            social_facebook_click,
            social_twitter_click,
            social_pinterest_click,
            social_instagram_click,
            social_tumblr_click,
            social_email_click,
            get_social_image_url,
            GetEmailBody,
            GetFacebookLink
        };
    }
};