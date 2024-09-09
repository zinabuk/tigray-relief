<!-- <script setup>
import PolicyService from '@/services/PolicyService'
import { onMounted, ref } from 'vue'

import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
const { currentLanguage } = storeToRefs(useAuthStore())
const policies = ref([])
const errorMessage = ref('')
const fetchPolicies = async () => {
  try {
    const response = await PolicyService.getAllPolicies()

    // alert(response.success)
    if (response.success) {
      policies.value = response.data.map((item) => ({
        ...item,
        title: JSON.parse(item.title),
        policy: JSON.parse(item.policy)
      }))
    }
    // console.log(policies.value)
  } catch (error) {
    errorMessage.value = 'Failed to fetch policies'
  }
}

onMounted(fetchPolicies)
</script>

<template>
  <section class="w-full py-4 md:py-12 text-[16px] bg-[#288fb2]/10">
    <div class="px-[1%] md:px-[7%] py-2">
      <div>
        <h1 class="text-2xl">{{ $t('Privacy Policy') }}</h1>
      </div>
    </div>
    <div class="px-[1%] md:px-[10%] flex flex-col gap-6 py-4">
      <div
        v-for="(policy, i) in policies"
        :key="i"
        class="bg-white shadow border rounded p-4 flex flex-col gap-2"
      >
        <h1 class="text-[20px] font-semibold">
          {{ currentLanguage === 'en' ? policy.title.en : policy.title.ti }}
        </h1>
        <p>{{ currentLanguage === 'en' ? policy.policy.en : policy.policy.ti }}</p>
      </div>
    </div>
  </section>
</template> -->

<script setup></script>

<template>
  <section class="w-full md:p-[2%] bg-[#53900F]/10 flex flex-col gap-2">
    <div>
      <h1 class="text-2xl font-light">Privacy Policy</h1>
    </div>
    <div class="flex flex-col gap-2 bg-white p-4">
      <h1>Respecting your privacy</h1>
      <div class="space-y-4">
        <p>
          This website is owned and operated by the Relief Society of Tigray (REST). We recognize
          that visitors to our site may be concerned about the information they provide to us,
          online or otherwise, and how we treat that information. This Privacy Policy addresses
          those concerns.
        </p>
        <p>
          The REST respects the privacy of all our supporters, whether donors, members of our
          mailing lists, or visitors to our website. Should you have questions regarding our privacy
          policy, you may contact us at info@resttigray.org
        </p>
      </div>
    </div>
    <div class="flex flex-col gap-2 bg-white p-4">
      <h1>Information collected by the REST</h1>
      <div class="space-y-4">
        <p>
          On our website we do not collect personally identifiable information from individuals
          unless they provide it to us voluntarily and knowingly. This means we do not require you
          to register or provide information to us in order to view our site. The REST only gathers
          personally identifiable information, such as names, addresses, zip/postal codes, email
          addresses, etc., when voluntarily submitted by a visitor. For example, personally
          identifiable information may be collected in order to respond to a stated desire to apply
          for a position, volunteer time to the REST, make a donation or sign up to be part of a
          REST mailing list.
        </p>
        <p>
          As with most other Internet sites, our web server automatically recognizes certain
          information about your device when you visit our website. This information includes your
          browser type and operating system; web pages on our website that you view; links you
          click; your device’s IP address; the length of time you visit our website; and the
          referring URL, or the webpage that led you to our website. We use the information we
          automatically collect to help diagnose problems with our server, to improve the content of
          our website, and for our online marketing efforts.
        </p>
        <p>
          We also collect information about you when you subscribe to receive text messages from us
          or if you send text messages to us. Data obtained about you in connection with these SMS
          services may include your mobile phone number, your carrier’s name and the date, time and
          content of your messages. We may use this information to contact you and provide the
          services you request from us. Except for our service providers who assist us in sending
          SMS messages, we do not share your text message consents with other parties. Alerts sent
          via SMS may not be delivered if the mobile phone is not in range of a transmission site,
          or if sufficient network capacity is not available at a particular time. Even within a
          coverage area, factors beyond the control of the wireless operator may interfere with
          message delivery, including the customer’s equipment, terrain, proximity to buildings,
          foliage, and weather. Wireless operators do not guarantee message delivery and will not be
          held liable for delayed or undelivered messages.
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-2 bg-white p-4">
      <h1>We may share your information, including personal information, as follows:</h1>
      <div class="space-y-4">
        <p>
          Affiliates. We may disclose the information we collect from you to our affiliates or
          subsidiaries; however, if we do so, their use and disclosure of your personally
          identifiable information will be subject to this Policy.
        </p>
        <p>
          Service Providers. We may disclose the information we collect from you to vendors, service
          providers, contractors or agents who perform functions on our behalf, such as hosting our
          website and processing payments. The REST requires that all service providers hold
          personal information in strict confidence.
        </p>

        <p>
          Non-affiliated Charities and Not-for-Profit Organizations. We may disclose certain
          information that we collect with other not-for-profit and charitable organizations for
          their own fundraising purposes. You may opt-out of such sharing as described in the
          Opt-Out Policy section below.
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-2 bg-white p-4">
      <h1>We may also share information in the following circumstances:</h1>
      <div class="space-y-4">
        <p>
          Business Transfers. If we are or may be acquired by or merged with another organization,
          including a non-profit or a for-profit entity, if substantially all of our assets are
          transferred to another organization, or as part of a bankruptcy proceeding, we may
          transfer the information we have collected about you to the other organization.
        </p>
        <p>
          In Response to Legal Process. We may disclose the information we collect from you in order
          to comply with the law, a judicial proceeding, court order, or other legal process, such
          as in response to a court order or a subpoena.
        </p>
        <p>
          To Protect Us and Others. We may disclose the information we collect from you where we
          believe it is necessary to investigate, prevent, or take action regarding illegal
          activities, suspected fraud, situations involving potential threats to the safety of any
          person, violations of our Terms and Conditions or this Policy, or as evidence in
          litigation in which we are involved.
        </p>

        <p>
          Aggregate and De-Identified Information. We may share aggregate, anonymous, or
          de-identified information with other entities for marketing, advertising, research or
          similar purposes.
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-2 bg-white p-4">
      <h1>Opt-out policy</h1>
      <div class="space-y-4">
        <p>
          If you supply us with your postal address, email address or phone number, you may receive
          periodic communications from us with information on our programs and services. If you do
          not want to receive postal mail, email or phone calls from us in the future, or if you
          would like us to no longer share your information with other not-for-profit and charitable
          organizations for their own purposes, please let us know by sending your request via email
          to info@resttigray.org.
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-2 bg-white p-4">
      <h1>Exceptions to opt-out policy</h1>
      <div class="space-y-4">
        <p>
          The REST may disclose personal information if compelled by law or a regulatory authority.
          In addition, we may need to disclose personal information in special cases when we have
          reason to believe that disclosing this information is necessary to identify, contact or
          bring legal action against someone who may be causing injury or interfering (either
          intentionally or unintentionally) with the REST’s rights or property, REST’s supporters,
          or anyone else that could be harmed by such activities.
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-2 bg-white p-4">
      <h1>Exceptions to opt-out policy</h1>
      <div class="space-y-4">
        <p>
          The REST may disclose personal information if compelled by law or a regulatory authority.
          In addition, we may need to disclose personal information in special cases when we have
          reason to believe that disclosing this information is necessary to identify, contact or
          bring legal action against someone who may be causing injury or interfering (either
          intentionally or unintentionally) with the REST’s rights or property, REST’s supporters,
          or anyone else that could be harmed by such activities.
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-2 bg-white p-4">
      <h1>Protecting your information</h1>
      <div class="space-y-4">
        <p>
          We have implemented reasonable precautions to protect the information we collect from loss, misuse, and unauthorized access, disclosure, alteration, and destruction.
        </p>
        <p>The REST’s online donation site has security measures in place to protect the loss, misuse and alteration of information under our control.  We have implemented measures designed to secure the collection and transmission of sensitive user information, including credit card information, by using SSL (Secure Socket Layer) encryption technology. This method reflects industry standard security protocol and makes it difficult for anyone to intercept your credit card information. Please be aware that despite our efforts, no data security measures can guarantee security.</p>
        <p>Credit card numbers are not stored on any REST servers. In REST’s software application, credit card numbers are replaced with reference tokens that are used to process future transactions (e.g. for recurring gift pledges). REST’s staff cannot access your credit card information at any time.</p>
        <p>If you would prefer to give by mail, please send your check to Relief Society of Tigray, PO Box 0020, Mekele, 17 kebelle, godena guna. If you would like to make a donation, you may mail us at resthq@resttigray.org.</p>
      </div>
    </div>
  </section>
</template>
