import { Component, State, Mixin } from 'src/core/shopware';
import template from './sw-settings-tax-detail.html.twig';

Component.register('sw-settings-tax-detail', {
    template,

    mixins: [
        Mixin.getByName('notification')
    ],

    data() {
        return {
            tax: {}
        };
    },

    computed: {
        taxStore() {
            return State.getStore('tax');
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            if (this.$route.params.id) {
                this.taxId = this.$route.params.id;
                this.tax = this.taxStore.getById(this.taxId);
            }
        },

        onSave() {
            const taxName = this.tax.name;
            const titleSaveSuccess = this.$tc('sw-settings-tax.detail.titleSaveSuccess');
            const messageSaveSuccess = this.$tc('sw-settings-tax.detail.messageSaveSuccess', 0, { name: taxName });

            return this.tax.save().then(() => {
                console.log(this);
                this.createNotificationSuccess({
                    title: titleSaveSuccess,
                    message: messageSaveSuccess
                });
            });
        }
    }
});
