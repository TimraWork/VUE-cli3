<template lang="pug">
	.content-wrapper
		section
			.container
				.not_found {{ $t('not_found') }}

</template>

<style lang="stylus">
.not_found {
  color: blue;
  font-size: 100px;
  height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
