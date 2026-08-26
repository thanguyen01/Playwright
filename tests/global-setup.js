// Global setup for CI - check server connectivity before tests run
const BASE_URL = process.env.BASE_URL || 'http://eaapp.somee.com';
const CI = !!process.env.CI;

async function globalSetup() {
  if (!CI) {
    console.log('Skipping connectivity check (not in CI)');
    return;
  }

  console.log(`Checking server connectivity: ${BASE_URL}`);
  
  try {
    const response = await fetch(BASE_URL, { 
      method: 'GET',
      signal: AbortSignal.timeout(30000)
    });
    
    // Any HTTP response means the server is reachable (even 5xx).
    // Let the tests themselves catch application-level failures.
    console.log(`✓ Server reachable: ${BASE_URL} (status: ${response.status})`);
  } catch (error) {
    console.error(`✗ Server unreachable: ${BASE_URL}`);
    console.error(`Error: ${error.message}`);
    throw new Error(`Application server at ${BASE_URL} is not reachable. Check if the service is running.`);
  }
}

export default globalSetup;

