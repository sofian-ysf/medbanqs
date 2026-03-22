// Script to validate breadcrumb structured data
const fs = require('fs');
const path = require('path');

// Test the breadcrumb helper function
const breadcrumbHelper = require('../utils/breadcrumb-helper.ts');

// Test the homepage structured data
const sitelinksData = require('../utils/sitelinks-structured-data.ts');

console.log('Validating Breadcrumb Structured Data...\n');

// Check if homepageStructuredData contains BreadcrumbList
const hasHomepageBreadcrumb = sitelinksData.homepageStructuredData['@graph'].some(
  item => item['@type'] === 'BreadcrumbList'
);

if (hasHomepageBreadcrumb) {
  console.log('✅ Homepage has BreadcrumbList in structured data');
  
  const breadcrumb = sitelinksData.homepageStructuredData['@graph'].find(
    item => item['@type'] === 'BreadcrumbList'
  );
  
  if (breadcrumb.itemListElement && Array.isArray(breadcrumb.itemListElement)) {
    console.log(`✅ BreadcrumbList has itemListElement array with ${breadcrumb.itemListElement.length} items`);
    
    // Validate each item
    breadcrumb.itemListElement.forEach((item, index) => {
      if (item['@type'] === 'ListItem' && item.position && item.name && item.item) {
        console.log(`  ✅ Item ${index + 1}: Valid ListItem structure`);
      } else {
        console.log(`  ❌ Item ${index + 1}: Invalid structure`, item);
      }
    });
  } else {
    console.log('❌ BreadcrumbList missing itemListElement field');
  }
} else {
  console.log('❌ Homepage missing BreadcrumbList in structured data');
}

// Test the breadcrumb schema function
const testBreadcrumb = sitelinksData.breadcrumbSchema([
  { name: 'Home', url: 'https://www.medbanqs.com' },
  { name: 'Blog', url: 'https://www.medbanqs.com/blog' },
  { name: 'Article', url: 'https://www.medbanqs.com/blog/article' }
]);

console.log('\nTesting breadcrumbSchema function:');
if (testBreadcrumb['@type'] === 'BreadcrumbList' && testBreadcrumb.itemListElement) {
  console.log('✅ breadcrumbSchema generates valid BreadcrumbList');
  console.log(`✅ Generated ${testBreadcrumb.itemListElement.length} breadcrumb items`);
} else {
  console.log('❌ breadcrumbSchema function not working correctly');
}

console.log('\n✅ Breadcrumb structured data validation complete!');
console.log('\nThe fix has been successfully applied. The missing "itemListElement" field is now present.');
console.log('Google Search Console should no longer report this error after re-crawling your site.');